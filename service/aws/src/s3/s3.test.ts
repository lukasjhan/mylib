import { S3Client } from '@aws-sdk/client-s3';
import { s3 } from './s3.infra';
import { region } from '../constant';
import credential from '../credential';
import { getBucketList } from './s3';

async function testS3() {
  const s3Client = new S3Client({ credentials: credential, region: region });

  console.log('\n=== S3 Test ===\n');

  const s3Conf = s3;
  const bucketList = await getBucketList(s3Client);

  for (const bucket of s3Conf) {
    const existing = bucketList.includes(bucket.name);
    if (existing) {
      console.log(`[N]: ${bucket.name}`);
      continue;
    }

    console.log(`[C]: ${bucket.name}`);
    console.log(JSON.stringify(bucket, null, 2));
  }
}

testS3();
