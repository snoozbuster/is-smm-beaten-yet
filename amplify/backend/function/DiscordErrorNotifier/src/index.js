/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	DiscordWebhookUrl
Amplify Params - DO NOT EDIT */

const axios = require('axios');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log('WEBHOOK URL:', process.env.DiscordWebhookUrl);

  try {
    const isOk = event.alarmData.state.value === 'OK';
    let message = `${event.alarmData.alarmName} has changed state to ${event.alarmData.state.value}. `;
    message += isOk
      ? `The issue has been resolved.`
      : `Something is going wrong.`;
    message += `\n\nThe reason for this transition was: ${event.alarmData.state.reason}`;

    const res = await axios.post(process.env.DiscordWebhookUrl, {
      content: message,
      username: 'issmmbeatenyet.com Monitor',
    });
    console.log('Response from discord:', res);
  } catch (e) {
    const res = await axios.post(process.env.DiscordWebhookUrl, {
      content: `Error while parsing alarm and generating Discord message: ${e.message}`,
      username: 'issmmbeatenyet.com Monitor',
    });
    console.log('Response from discord:', res);
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
