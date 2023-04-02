import {
  GetQueueAttributesCommand,
  ListQueuesCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

export const getSQSList = async (sqs: SQSClient) => {
  const command = new ListQueuesCommand({ MaxResults: 1000 });

  try {
    const result = await sqs.send(command);
    return result.QueueUrls ?? [];
  } catch (error: any) {
    console.log(`getSQSList error: ${error}`);
    throw new Error('getSQSList error');
  }
};

export const getSQSAttribute = async (sqs: SQSClient, queueUrl: string) => {
  const command = new GetQueueAttributesCommand({
    QueueUrl: queueUrl,
    AttributeNames: ['All'],
  });

  try {
    const result = await sqs.send(command);

    if (result.Attributes === undefined) return undefined;

    const {
      VisibilityTimeout,
      DelaySeconds,
      MessageRetentionPeriod,
      Policy,
      RedrivePolicy,
    } = result.Attributes;
    return {
      VisibilityTimeout,
      DelaySeconds,
      MessageRetentionPeriod,
      Policy,
      RedrivePolicy,
    };
  } catch (error: any) {
    console.log(`SQS attribute not found ${queueUrl}, error: ${error}`);
    throw new Error('getSQSAttribute error');
  }
};
