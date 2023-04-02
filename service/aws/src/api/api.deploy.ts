import { APIGatewayClient } from '@aws-sdk/client-api-gateway';
import { Route53Client } from '@aws-sdk/client-route-53';
import { api } from './api.infra';
import {
  createApiMapping,
  createDomainName,
  listApis,
  listDomainNames,
} from './api';
import { region } from '../constant';
import credential from '../credential';
import { createDomain } from '../route53/route53';

async function deployApi() {
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
    console.log(`Domain ${existingDomainNames.name} already exists`);
    return;
  }

  const ret = await createDomainName(apiClient, apiConf.name);
  if (!ret) {
    throw new Error('domain creation failed!');
  }
  console.log(`create domain ${apiConf.name}`);

  const url = ret.regionalDomainName;
  const apiList = await listApis(apiClient);

  if (!apiList || !url) {
    throw new Error('apiList or url not found');
  }

  for (const mapping of apiConf.mappings) {
    const { path, apiName, stage } = mapping;

    const apiKey = apiList.find(api => api.name === apiName);
    if (!apiKey || !apiKey.id) {
      throw new Error(`api ${apiName} not found`);
    }

    const apiKeyId = apiKey.id;
    await createApiMapping(
      apiClient,
      apiKeyId,
      apiConf.domainName,
      path,
      stage,
    );
  }

  const route53Client = new Route53Client({
    credentials: credential,
    region: region,
  });
  await createDomain(route53Client, apiConf.domainName, url, false);
}

deployApi();
