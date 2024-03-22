/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	DiscordWebhookUrl
Amplify Params - DO NOT EDIT */

const axios = require('axios');

const MY_DISCORD_ID = '139914238696095754';
const AT_ME = `<@${MY_DISCORD_ID}>`;

async function sendMessage(message) {
  console.log('Sending raw message:', message);
  const res = await axios.post(process.env.DiscordWebhookUrl, {
    content: message,
    username: 'issmmbeatenyet.com Monitor',
    allowed_mentions: {
      users: [MY_DISCORD_ID],
    },
  });
  console.log('Response from discord:', res);
}

const ALARM_DESCRIPTIONS = {
  UnusualTrafficDetector:
    'Unusual site traffic patterns have been detected. Traffic may be spiking.',
  Amplify5xxErrors:
    'The site is experiencing server errors and (at least part of it) is probably down.',
  DurationAlarm:
    'The background job to sync gsheets data took longer than usual.',
  SyncErrors: 'The background job to sync gsheets data crashed.',
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log('WEBHOOK URL:', process.env.DiscordWebhookUrl);

  try {
    if (
      event.alarmData.state.value === 'INSUFFICIENT_DATA' ||
      (event.alarmData.previousState.value === 'INSUFFICIENT_DATA' &&
        event.alarmData.state.value === 'OK')
    ) {
      console.log('Ignoring insufficient data alarm event');
      return;
    }
    const isOk = event.alarmData.state.value === 'OK';
    let message = `${!isOk ? AT_ME : 'The previous alarm for'} \`${
      event.alarmData.alarmName
    }\` has changed state to ${event.alarmData.state.value}. `;
    message += isOk
      ? `All is well; relax.`
      : ALARM_DESCRIPTIONS[event.alarmData.alarmName] ??
        `Something is going wrong.`;
    message += `\n\nAdditional information:\n${event.alarmData.state.reason}`;

    await sendMessage(message);
  } catch (e) {
    await sendMessage(
      `${AT_ME} Error while parsing alarm and generating Discord message: ${e.message}`,
    );
  }

  return {
    statusCode: 200,
  };
};
