import json
from nintendo import nnas 
import anyio
import argparse

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

async def main(): 
  parser = argparse.ArgumentParser(description='Extract pids from player data')
  parser.add_argument('players', type=open, help='JSON file containing an array of player NNIDs')
  
  args = parser.parse_args()

  players = json.load(args.players)

  nas = nnas.NNASClient()

  nnid_map = {}
  for player_batch in chunks(players, 100):
    nnid_map |= await nas.get_pids(player_batch)

  print(json.dumps(nnid_map))

anyio.run(main)