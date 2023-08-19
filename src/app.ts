import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { scrapeProductFromUrl } from './scrape';

export const lambdaHandler = async (event: any): Promise<APIGatewayProxyResult> => {
  try {
    const url = event.queryStringParameters?.url || event['url'];

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'URL query parameter is missing.',
        }),
      };
    }

    const product = await scrapeProductFromUrl(url);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Received URL',
        url: url,
        product: product,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err,
      }),
    };
  }
};
