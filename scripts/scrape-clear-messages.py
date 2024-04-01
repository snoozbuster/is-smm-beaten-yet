import re
import os
import csv
import datetime
import discord

token = os.getenv('DISCORD_TOKEN')

client = discord.Client(intents=discord.Intents.default())

level_segment_re = '[A-F0-9]{4}'
bookmark_regex = re.compile(
    f'(?:https://)supermariomakerbookmark.nintendo.net/courses/({level_segment_re}-0000-{level_segment_re}-{level_segment_re})')

message_meta = {}


@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')
    channel = client.get_channel(395290965763686410)
    msg_count = 0
    id_count = 0
    ids = []
    async for message in channel.history(limit=None, before=datetime.datetime(2021, 6, 30)):
        msg_count += 1
        if msg_count % 100 == 0:
            print(f'Reading message {msg_count}. Found {id_count} IDs so far')
        results = bookmark_regex.findall(message.content)
        if len(results):
            ids.append((results, message.created_at.isoformat(), message.author.global_name or message.author.id,
                       message.content, message.jump_url))
        id_count += len(results)

    print(f"Writing results from {len(ids)} messages")
    with open('./messages_ids.csv', 'w', newline='', encoding='UTF-8') as f:
        wr = csv.writer(f, quoting=csv.QUOTE_ALL)
        wr.writerow(["Level ID", "Message posted time",
                    "Poster", "Message content", "Link"])
        for msg in ids:
            for id in msg[0]:
                wr.writerow([id, msg[1], msg[2], msg[3], msg[4]])

    print('Done!')


client.run(token)
