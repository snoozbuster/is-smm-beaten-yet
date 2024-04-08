import os
import json
import anyio
from nintendo.nex import backend, datastore_smm, settings, rmc, common, streams


def convert_code_to_data_id(code):
    try:
        code = code.upper().replace('-', '')
        hex_code = '0x' + str(code[8:])

        data_id = int(hex_code, 16)
        return data_id
    except:
        return 'INVALID CODE'


class BufferQueueParam(common.Structure):
    def __init__(self):
        super().__init__()
        self.data_id = None
        self.slot = None

    def load(self, stream, version):
        self.data_id = stream.u64()
        self.slot = stream.u32()

    def save(self, stream, version):
        stream.u64(self.data_id)
        stream.u32(self.slot)


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


nex_keys = open(os.path.join(os.path.dirname(
    __file__), '../nex-keys.txt')).read()

NEX_USERNAME = nex_keys.split(":")[0]
NEX_PASSWORD = nex_keys.split(":")[1]

# Globals (get set later)
nex_token = None
datastore_smm_client = None


async def get_buffer_queues(params: list[BufferQueueParam]) -> rmc.RMCResponse:
    # * --- request ---
    stream = streams.StreamOut(datastore_smm_client.settings)
    stream.list(params, stream.add)
    data = await datastore_smm_client.client.request(datastore_smm_client.PROTOCOL_ID, 55, stream.get())

    # * --- response ---
    stream = streams.StreamIn(data, datastore_smm_client.settings)

    obj = rmc.RMCResponse()
    obj.buffer_queues = []

    length = stream.u32()

    for _ in range(length):
        obj.buffer_queues.append(stream.list(stream.qbuffer))

    obj.results = stream.list(common.Result)

    return obj


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


async def main():
    global datastore_smm_client

    s = settings.default()
    s.configure("9f2b4678", 30810)

    course_ids = [
        '5BE8-0000-02E4-5BAB'
    ]

    results = {}

    async with backend.connect(s, "52.40.192.64", "59900") as be:  # * Skip NNID API
        async with be.login(NEX_USERNAME, NEX_PASSWORD) as client:
            datastore_smm_client = datastore_smm.DataStoreClientSMM(client)

            for course_id in course_ids:
                data_id = convert_code_to_data_id(course_id)

                param = BufferQueueParam()
                param.data_id = data_id
                param.slot = 1

                response = await get_buffer_queues([param])

                data_ids = [int.from_bytes(b, byteorder='little')
                            for b in response.buffer_queues[0]]

                param = DataStoreGetCustomRankingByDataIdParam()
                param.application_id = 300000000
                param.data_id_list = data_ids
                param.result_option = 0x27

                result = await get_custom_ranking_by_data_id(param)

                clearers = [r.meta_info.name for r in result.ranking_result]

                results[course_id] = clearers
    print(json.dumps(results))

anyio.run(main)
