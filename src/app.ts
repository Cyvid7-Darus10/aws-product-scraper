import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { scrapeProductFromUrl } from './scrape';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const url =
      'https://m.shein.com/ph/SHEIN-ICON-Letter-Embroidery-Contrast-Side-Seam-Tube-Bodycon-Dress-p-13509178-cat-1727.html?mallCode=1';

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
