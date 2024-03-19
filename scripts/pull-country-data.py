import os
from nintendo.nex import backend, datastore, settings
import anyio
import argparse
import json
import time
import sys

nex_keys = open(os.path.join(os.path.dirname(__file__), '../nex-keys.txt')).read()

NEX_USERNAME = nex_keys.split(":")[0]
NEX_PASSWORD = nex_keys.split(":")[1]

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

GET_FLAGS = 0x1
CHUNK_SIZE = 25 # I can't set this much higher without a timeout

def make_param(pid):
  param = datastore.DataStoreGetMetaParam()
  param.result_option = GET_FLAGS
  param.persistence_target = datastore.DataStorePersistenceTarget()
  param.persistence_target.owner_id = pid
  param.persistence_target.persistence_id = 0
  return param

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

async def main():
  parser = argparse.ArgumentParser(description='Extract country data from nnid => pid map')
  parser.add_argument('pid_map', type=open, help='JSON file containing a map of NNIDs to pids')
  
  args = parser.parse_args()

  pid_map = json.load(args.pid_map)
  pids = list(pid_map.values())
  # pids = [1792123826] # snooz
  s = settings.default()
  s.configure("9f2b4678", 30810)

  async with backend.connect(s, "52.40.192.64", "59900") as be: # * Skip NNID API
    async with be.login(NEX_USERNAME, NEX_PASSWORD) as client:
      datastore_client = datastore.DataStoreClient(client)

      country_map = {}

      i = 0
      for pid_chunk in chunks(pids, CHUNK_SIZE):
        print('Starting index: ' + str(i) + '/' + str(len(pids)) + " (chunk " + str(i // CHUNK_SIZE + 1) + "/" + str(len(pids) // CHUNK_SIZE) + ")", file=sys.stderr)
        params = [make_param(pid) for pid in pid_chunk]
        res = await datastore_client.get_metas_multiple_param(params)
        for info in res.infos:
          country_map[info.name] = COUNTRY_CODES[info.tags[0]]
        i += len(params)
        time.sleep(1)

      print(json.dumps(country_map))


anyio.run(main); 