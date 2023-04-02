import { APIGatewayClient } from '@aws-sdk/client-api-gateway';
import { api } from './api.infra';
import { listDomainNames } from './api';
import { region } from '../constant';
import credential from '../credential';

async function testApi() {
  const apiClient = new APIGatewayClient({
    credentials: credential,
    region: region,
  });
  const apiConf = api;

  const customDomainNames = await listDomainNames(apiClient);

  if (!customDomainNames) {
    throw new Error('customDomainNames not found');
  }

  const existingDomainNames = customDomainNames.find(
    domain => apiConf.name === domain.name,
  );
  if (existingDomainNames) {
    console.log(`[N]: ${apiConf.name}`);
    return;
  } else {
    console.log(`[C]: ${apiConf.name}`);
  }
}

testApi();
