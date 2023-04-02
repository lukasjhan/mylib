import { SQSClient } from '@aws-sdk/client-sqs';
import { basename } from 'path';
import { sqs } from './sqs.infra';
import { region } from '../constant';
import credential from '../credential';
import { getSQSAttribute, getSQSList } from './sqs';

async function testSQS() {
  const sqsClient = new SQSClient({ ...credential, region: region });
  const queues = (await getSQSList(sqsClient)).map(queue => basename(queue));
  const sqsConf = sqs;
  console.log('\n=== SQS Test ===\n');
  for (const value of sqsConf) {
    const exist = queues.includes(value.name);
    const ret = await getSQSAttribute(sqsClient, value.name);
    if (ret === undefined) {
      console.error('attribute not found error');
      continue;
    }
    const deployed =
      ret.VisibilityTimeout === value.VisibilityTimeout &&
      ret.DelaySeconds === value.DelaySeconds &&
      ret.Policy === JSON.stringify(value.Policy) &&
      ret.RedrivePolicy === JSON.stringify(value.RedrivePolicy);

    console.log(`${exist ? (deployed ? '[N]' : '[M]') : '[C]'}: ${value.name}`);
    if (!deployed) {
      console.log(JSON.stringify(value, null, 2));
    }
  }
}

testSQS();
