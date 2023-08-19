import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';

const createEvent = (queryStringParameters: APIGatewayProxyEventQueryStringParameters): APIGatewayProxyEvent => ({
  httpMethod: 'get',
  body: '',
  headers: {},
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: {},
  path: '/scrape',
  pathParameters: {},
  queryStringParameters,
  requestContext: {
    accountId: '123456789012',
    apiId: '1234',
    authorizer: {},
    httpMethod: 'get',
    identity: {
      accessKey: '',
      accountId: '',
      apiKey: '',
      apiKeyId: '',
      caller: '',
      clientCert: {
        clientCertPem: '',
        issuerDN: '',
        serialNumber: '',
        subjectDN: '',
        validity: { notAfter: '', notBefore: '' },
      },
      cognitoAuthenticationProvider: '',
      cognitoAuthenticationType: '',
      cognitoIdentityId: '',
      cognitoIdentityPoolId: '',
      principalOrgId: '',
      sourceIp: '',
      user: '',
      userAgent: '',
      userArn: '',
    },
    path: '/src',
    protocol: 'HTTP/1.1',
    requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
    requestTimeEpoch: 1428582896000,
    resourceId: '123456',
    resourcePath: '/src',
    stage: 'dev',
  },
  resource: '',
  stageVariables: {},
});

describe('Unit test for app handler', function () {
  it('verifies successful response', async () => {
    const testUrl = 'https://example.com';

    const event: APIGatewayProxyEvent = createEvent({ url: testUrl });
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify({
        message: 'Received URL',
        url: testUrl,
        product: {
          title: null,
          price: null,
          image: null,
        },
      }),
    );
  });

  it('verifies missing URL parameter', async () => {
    const event = createEvent({}); // No URL parameter provided

    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: 'URL query parameter is missing.',
      }),
    );
  });
});
