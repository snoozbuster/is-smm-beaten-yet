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

  const res = await axios.post(process.env.DiscordWebhookUrl, {
    content: 'Hello from AWS!',
    username: 'issmmbeatenyet.com',
  });

  console.log('Response from discord:', res);

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  };
};
