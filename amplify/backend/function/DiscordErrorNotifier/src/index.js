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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log('WEBHOOK URL:', process.env.DiscordWebhookUrl);

  try {
    const isOk = event.alarmData.state.value === 'OK';
    let message = `${AT_ME} \`${event.alarmData.alarmName}\` has changed state to ${event.alarmData.state.value}. `;
    message += isOk
      ? `The issue has been resolved.`
      : `Something is going wrong.`;
    message += `\n\nThe reason for this transition was: ${event.alarmData.state.reason}`;

    await sendMessage(message);
  } catch (e) {
    await sendMessage(
      `Error while parsing alarm and generating Discord message: ${e.message}`,
    );
  }

  return {
    statusCode: 200,
  };
};
