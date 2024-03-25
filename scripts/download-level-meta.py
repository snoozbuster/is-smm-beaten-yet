'''
Use at your own risk, I am not resposible for any bans

Requires Python 3 and https://github.com/Kinnay/NintendoClients
'''

import logging
import os
import json
import struct
import hashlib
import hmac
import argparse
from nintendo.nex import backend, datastore_smm, settings, rmc, common, streams
from anynet import http
import anyio

logger = logging.getLogger(__name__)

# https://www.wiibrew.org/wiki/Country_Codes
COUNTRY_CODES = {
    '1': 'Japan',
    # Americas
    '8': 'Anguilla',
    '9': 'Antigua and Barbuda',
    '10': 'Argentina',
    '11': 'Aruba',
    '12': 'Bahamas',
    '13': 'Barbados',
    '14': 'Belize',
    '15': 'Bolivia',
    '16': 'Brazil',
    '17': 'British Virgin Islands',
    '18': 'Canada',
    '19': 'Cayman Islands',
    '20': 'Chile',
    '21': 'Colombia',
    '22': 'Costa Rica',
    '23': 'Dominica',
    '24': 'Dominican Republic',
    '25': 'Ecuador',
    '26': 'El Salvador',
    '27': 'French Guiana',
    '28': 'Grenada',
    '29': 'Guadeloupe',
    '30': 'Guatemala',
    '31': 'Guyana',
    '32': 'Haiti',
    '33': 'Honduras',
    '34': 'Jamaica',
    '35': 'Martinique',
    '36': 'Mexico',
    '37': 'Montserrat',
    '38': 'Netherlands Antilles',
    '39': 'Nicaragua',
    '40': 'Panama',
    '41': 'Paraguay',
    '42': 'Peru',
    '43': 'St. Kitts and Nevis',
    '44': 'St. Lucia',
    '45': 'St. Vincent and the Grenadines',
    '46': 'Suriname',
    '47': 'Trinidad and Tobago',
    '48': 'Turks and Caicos Islands',
    '49': 'United States',
    '50': 'Uruguay',
    '51': 'US Virgin Islands',
    '52': 'Venezuela',
    # Europe & Africa
    '64': 'Albania',
    '65': 'Australia',
    '66': 'Austria',
    '67': 'Belgium',
    '68': 'Bosnia and Herzegovina',
    '69': 'Botswana',
    '70': 'Bulgaria',
    '71': 'Croatia',
    '72': 'Cyprus',
    '73': 'Czech Republic',
    '74': 'Denmark',
    '75': 'Estonia',
    '76': 'Finland',
    '77': 'France',
    '78': 'Germany',
    '79': 'Greece',
    '80': 'Hungary',
    '81': 'Iceland',
    '82': 'Ireland',
    '83': 'Italy',
    '84': 'Latvia',
    '85': 'Lesotho',
    '86': 'Lichtenstein',
    '87': 'Lithuania',
    '88': 'Luxembourg',
    '89': 'F.Y.R of Macedonia',
    '90': 'Malta',
    '91': 'Montenegro',
    '92': 'Mozambique',
    '93': 'Namibia',
    '94': 'Netherlands',
    '95': 'New Zealand',
    '96': 'Norway',
    '97': 'Poland',
    '98': 'Portugal',
    '99': 'Romania',
    '100': 'Russia',
    '101': 'Serbia',
    '102': 'Slovakia',
    '103': 'Slovenia',
    '104': 'South Africa',
    '105': 'Spain',
    '106': 'Swaziland',
    '107': 'Sweden',
    '108': 'Switzerland',
    '109': 'Turkey',
    '110': 'United Kingdom',
    '111': 'Zambia',
    '112': 'Zimbabwe',
    '113': 'Azerbaijan',
    '114': 'Mauritania (Islamic Republic of Mauritania)',
    '115': 'Mali (Republic of Mali)',
    '116': 'Niger (Republic of Niger)',
    '117': 'Chad (Republic of Chad)',
    '118': 'Sudan (Republic of the Sudan)',
    '119': 'Eritrea (State of Eritrea)',
    '120': 'Djibouti (Republic of Djibouti)',
    '121': 'Somalia (Somali Republic)',
    # SE Asia
    '128': 'Taiwan',
    '136': 'South Korea',
    '144': 'Hong Kong',
    '145': 'Macao',
    '152': 'Indonesia',
    '153': 'Singapore',
    '154': 'Thailand',
    '155': 'Philippines',
    '156': 'Malaysia',
    '160': 'China',
    # Middle east
    '168': 'U.A.E.',
    '169': 'India',
    '170': 'Egypt',
    '171': 'Oman',
    '172': 'Qatar',
    '173': 'Kuwait',
    '174': 'Saudi Arabia',
    '175': 'Syria',
    '176': 'Bahrain',
    '177': 'Jordan',
}

nex_keys = open(os.path.join(os.path.dirname(
    __file__), '../nex-keys.txt')).read()

NEX_USERNAME = nex_keys.split(":")[0]
NEX_PASSWORD = nex_keys.split(":")[1]

# Globals (get set later)
nex_token = None
datastore_smm_client = None


def convert_data_id_to_code(idno):
    key = hashlib.md5(b"9f2b4678").digest()

    data = struct.pack("<Q", int(idno))

    checksum = hmac.HMAC(key, data, 'md5').digest()
    checksum = checksum[3:1:-1].hex().upper()
    idstring = str.upper(hex(idno))[2:]

    for y in range(8 - len(idstring)):
        idstring = '0' + str(idstring)

    code = str(checksum) + '0000' + str(idstring)
    return code


def convert_code_to_data_id(code):
    try:
        code = code.upper().replace('-', '')
        hex_code = '0x' + str(code[8:])

        data_id = int(hex_code, 16)
        return data_id
    except:
        return 'INVALID CODE'


def to_ISO(d: common.DateTime):
    return d.standard_datetime().strftime('%Y-%m-%dT%H:%M:%S')


def json_def(o):
    """json.dumps helper function"""
    if isinstance(o, common.DateTime):
        return to_ISO(o)
    try:
        # remove empty binary value (breaks JSON parsing)
        if "unk" in o.__dict__:
            o.unk = 0

        return o.__dict__
    except:
        return str(o)


def make_param(pid):
    GET_FLAGS = 0x1
    param = datastore_smm.DataStoreGetMetaParam()
    param.result_option = GET_FLAGS | 0x4
    param.persistence_target = datastore_smm.DataStorePersistenceTarget()
    param.persistence_target.owner_id = pid
    param.persistence_target.persistence_id = 0
    return param


async def get_nnids(known_pids: dict[int, str], pids: list[int]):
    params = [make_param(pid) for pid in pids if pid not in known_pids]

    if params:
        logger.info('Retrieving profiles for pids: %s', json.dumps(
            [param.persistence_target.owner_id for param in params]))
        result = await datastore_smm_client.get_metas_multiple_param(params)
        results = {r.owner_id: r for r in result.infos}

    return {
        pid: (
            {
                'nnid': results[pid].name,
                'country': COUNTRY_CODES[results[pid].tags[0]] if len(results[pid].tags) else ''
            }
            if pid not in known_pids
            else {'nnid': known_pids[pid]}
        ) for pid in pids
    }

# some of these are invalid, I didnt feel like making a list of them all
# this should work just fine though
event_course_ids = range(930000, 930050)
official_maker_course_ids = range(910000, 920001)


async def download_course_file(data_id: int, course_id: str, course_dir: str, existing_files_dir: str):
    filename = f'{course_id}_compressed'
    if os.path.exists(os.path.join(existing_files_dir, filename)) or os.path.exists(os.path.join(course_dir, filename)):
        logger.info(
            'Course file already found for %s, skipping download', course_id)
        return

    logger.info('Downloading course file for %s', course_id)
    try:
        param = datastore_smm.DataStorePrepareGetParam()
        param.data_id = data_id
        param.extra_data = []

        result = await datastore_smm_client.prepare_get_object(param)

        headers = {header.key: header.value for header in result.headers}
        course_data_url = result.url
        response = await http.get(course_data_url, headers=headers)

        with open(os.path.join(course_dir, filename), 'wb') as object_file:
            object_file.write(response.body)
    except BaseException:
        logger.error('Download failed for %s', course_id, exc_info=1)


async def main():
    global meta_info
    global datastore_smm_client

    parser = argparse.ArgumentParser(
        description='Download level data for a list of level IDs')
    parser.add_argument('--pids', dest='pid_map', type=open,
                        help='JSON file containing a map of NNIDs to pids')
    parser.add_argument('--logs', dest='logfile', default='download_levels.log',
                        help='File to write logs to')
    parser.add_argument('--level-records-dir', dest='level_dir',
                        default='./levels', help="Directory to write level records to")
    parser.add_argument('--compressed-files-dir', dest='compressed_files_dir',
                        default='./compressed_levels', help="Directory to write compressed file records to")
    parser.add_argument('--existing-compressed-files-dir', dest='check_compressed_dir',
                        default=None, help="Directory containing compressed files to check against")
    parser.add_argument('--pids-out', dest="pid_map_out", default='./new_pids.json',
                        help="File to write newly discovered pids and country data to")
    parser.add_argument(
        'levels', type=open, help="JSON file containing an array of level IDs to download")
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, filename=args.logfile)

    s = settings.default()
    s.configure("9f2b4678", 30810)

    pid_map = json.load(args.pid_map)
    # invert nnid => pid to pid => nnid
    known_pids = {v: k for k, v in pid_map.items()}
    new_pids = {}

    level_records_dir = args.level_dir
    compressed_levels_dir = args.compressed_files_dir
    os.makedirs(level_records_dir, exist_ok=True)
    os.makedirs(compressed_levels_dir, exist_ok=True)

    all_levels = json.load(args.levels)
    # course_ids = ['569F-0000-0327-A604']
    logger.info('Checking %d levels for existing records', len(all_levels))
    course_ids = [id for id in all_levels
                  if not os.path.exists(os.path.join(level_records_dir, f'{id}.json'))]

    logger.info('%s levels to download', len(course_ids))

    logger.info('backend.connect')
    i = len(course_ids)
    num_consec_errors = 0
    try:
        async with backend.connect(s, "52.40.192.64", "59900") as be:  # * Skip NNID API
            async with be.login(NEX_USERNAME, NEX_PASSWORD) as client:
                datastore_smm_client = datastore_smm.DataStoreClientSMM(client)
                logger.info('client acquired')

                for course_id in course_ids:
                    if num_consec_errors >= 3:
                        print('Too many errors. quitting out')
                        break

                    print(f"{i} levels remaining")
                    try:
                        # Process course_id
                        course_id = course_id.strip()
                        global meta_info
                        logger.info('Starting %s...', course_id)
                        data_id = convert_code_to_data_id(course_id)

                        if data_id == 'INVALID CODE':
                            logger.error("Invalid code: %s", course_id)
                            continue

                        # Get course metadata
                        metadata = {
                            'is_event_course': False,
                            'is_official_maker_course': False,
                            'world_record': {},
                            'miis': {
                                'creator': {},
                                'first_complete': {}
                            }
                        }

                        logger.info('Fetching course meta')
                        if data_id in event_course_ids or data_id in official_maker_course_ids:
                            logger.info(
                                'Official event course detected (?????)')
                            param = datastore_smm.DataStoreGetMetaParam()
                            param.data_id = data_id
                            param.persistence_target = datastore_smm.DataStorePersistenceTarget()
                            param.persistence_target.owner_id = 0
                            param.persistence_target.persistence_id = 0xFFFF
                            param.result_option = 6
                            param.access_password = 0

                            result = await datastore_smm_client.get_metas_multiple_param([param])

                            meta_info = result.infos[0]

                            metadata['is_event_course'] = data_id in event_course_ids
                            metadata['is_official_maker_course'] = data_id in official_maker_course_ids
                        else:
                            param = DataStoreGetCustomRankingByDataIdParam()
                            param.application_id = 0
                            param.data_id_list = [data_id]
                            param.result_option = 0x27

                            result = await get_custom_ranking_by_data_id(param)
                            if not result.ranking_result:
                                logger.warning(
                                    'No response from server for %s. Presuming deleted', course_id)
                                continue
                            result.results[0].raise_if_error()

                            ranking_result = result.ranking_result[0]
                            meta_info = ranking_result.meta_info

                            metadata['stars'] = ranking_result.score

                        logger.info('Building metadata')
                        metadata['create_time'] = to_ISO(meta_info.create_time)
                        metadata['update_time'] = to_ISO(meta_info.update_time)
                        metadata['course_name'] = meta_info.name
                        metadata['creator_pid'] = meta_info.owner_id
                        metadata['user_plays'] = meta_info.ratings[0].info.total_value
                        metadata['clears'] = meta_info.ratings[2].info.total_value
                        metadata['total_attempts'] = meta_info.ratings[3].info.total_value
                        metadata['failures'] = meta_info.ratings[4].info.total_value

                        metadata['unknown1'] = meta_info.ratings[1]
                        metadata['unknown2'] = meta_info.ratings[5]
                        metadata['unknown3'] = meta_info.ratings[6]

                        # Get Course WR Data
                        if metadata['clears'] > 0:
                            logger.info(
                                'Fetching world records for cleared level')
                            param = DataStoreGetCourseRecordParam()
                            param.data_id = data_id
                            param.slot = 0

                            result = await get_course_record(param)

                            metadata['world_record']['best_time_pid'] = result.best_pid
                            metadata['world_record']['first_complete_pid'] = result.first_pid
                            metadata['world_record']['time_milliseconds'] = result.best_score
                            metadata['world_record']['created_time'] = to_ISO(
                                result.created_time)
                            metadata['world_record']['updated_time'] = to_ISO(
                                result.updated_time)
                        else:
                            logger.warning('Found uncleared level (?!?!?!)')

                        # Get Mii data for the course creator, WR holder and first time completion
                        pids = [metadata['creator_pid']]

                        if metadata['clears'] > 0:
                            pids.append(
                                metadata['world_record']['best_time_pid'])
                            pids.append(metadata['world_record']
                                        ['first_complete_pid'])

                        nnids = await get_nnids(known_pids, pids)

                        metadata['miis'] = {
                            'creator': nnids[metadata['creator_pid']]
                        }

                        if metadata['clears'] > 0:
                            metadata['miis']['world_record'] = nnids[metadata['world_record']
                                                                     ['best_time_pid']]
                            metadata['miis']['first_clear'] = nnids[metadata['world_record']
                                                                    ['first_complete_pid']]

                        for (pid, nnid) in nnids.items():
                            if pid not in known_pids and pid not in new_pids:
                                new_pids[pid] = nnid

                        with open(os.path.join(level_records_dir, f'{course_id}.json'), 'w', encoding='UTF-8') as level:
                            json.dump(metadata, fp=level,
                                      default=json_def,
                                      ensure_ascii=False, indent=2)
                        logger.info('Saved course ID %s', course_id)

                        await download_course_file(data_id, course_id, compressed_levels_dir, args.check_compressed_dir)
                        num_consec_errors = 0
                    except common.RMCError as e:
                        logger.warning('RMCError: "%s"', e.name())
                        if e.name() == "DataStore::NotFound":
                            logger.warning('Course deleted: %s', course_id)
                            print('Course not found')
                        else:
                            print('Unknown RMCError')
                            num_consec_errors += 1
                    except BaseException as err:
                        logger.error('Unknown error occured: %s (%s)',
                                     type(err), err, exc_info=1)
                        print('Unknown Error')
                        num_consec_errors += 1
                    finally:
                        i -= 1
    finally:
        with open(args.pid_map_out, 'w', encoding='UTF-8') as pid_map_out:
            json.dump(new_pids, pid_map_out)


#########################################################
# Not implemented in NintendoClients, implementing here #
#########################################################

class DataStoreGetCustomRankingByDataIdParam(common.Structure):
    def __init__(self):
        super().__init__()
        self.application_id = None
        self.data_id_list = None
        self.result_option = None

    def load(self, stream, version):
        self.application_id = stream.u32()
        self.data_id_list = stream.list(stream.u64)
        self.result_option = stream.u8()

    def save(self, stream, version):
        stream.u32(self.application_id)
        stream.list(self.data_id_list, stream.u64)
        stream.u8(self.result_option)


class DataStoreCustomRankingResult(common.Structure):
    def __init__(self):
        super().__init__()
        self.order = None
        self.score = None
        self.meta_info = None

    def load(self, stream, version):
        self.order = stream.u32()
        self.score = stream.u32()
        self.meta_info = stream.extract(datastore_smm.DataStoreMetaInfo)

    def save(self, stream, version):
        stream.u32(self.order)
        stream.u32(self.score)
        stream.add(self.meta_info)


class DataStoreGetCourseRecordParam(common.Structure):
    def __init__(self):
        super().__init__()
        self.data_id = None
        self.slot = None

    def load(self, stream, version):
        self.data_id = stream.u64()
        self.slot = stream.u8()

    def save(self, stream, version):
        stream.u64(self.data_id)
        stream.u8(self.slot)


class DataStoreGetCourseRecordResult(common.Structure):
    def __init__(self):
        super().__init__()
        self.data_id = None
        self.slot = None
        self.first_pid = None
        self.best_pid = None
        self.best_score = None
        self.created_time = None
        self.updated_time = None

    def load(self, stream, version):
        self.data_id = stream.u64()
        self.slot = stream.u8()
        self.first_pid = stream.u32()
        self.best_pid = stream.u32()
        self.best_score = stream.s32()
        self.created_time = stream.datetime()
        self.updated_time = stream.datetime()

    def save(self, stream, version):
        stream.u64(self.data_id)
        stream.u8(self.slot)
        stream.u32(self.first_pid)
        stream.u32(self.best_pid)
        stream.s32(self.best_score)
        stream.datetime(self.created_time)
        stream.datetime(self.updated_time)


async def get_custom_ranking_by_data_id(param):
    # --- request ---
    stream = streams.StreamOut(datastore_smm_client.settings)
    stream.add(param)
    data = await datastore_smm_client.client.request(datastore_smm_client.PROTOCOL_ID, 50, stream.get())

    # --- response ---
    stream = streams.StreamIn(data, datastore_smm_client.settings)

    obj = rmc.RMCResponse()
    obj.ranking_result = stream.list(DataStoreCustomRankingResult)
    obj.results = stream.list(common.Result)

    return obj


async def get_course_record(param):
    # --- request ---
    stream = streams.StreamOut(datastore_smm_client.settings)
    stream.add(param)
    data = await datastore_smm_client.client.request(datastore_smm_client.PROTOCOL_ID, 72, stream.get())

    # --- response ---
    stream = streams.StreamIn(data, datastore_smm_client.settings)

    result = stream.extract(DataStoreGetCourseRecordResult)

    return result

anyio.run(main)
