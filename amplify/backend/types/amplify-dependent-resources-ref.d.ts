export type AmplifyDependentResourcesAttributes = {
  "function": {
    "DiscordErrorNotifier": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "SyncLevelsGSheets": {
      "Arn": "string",
      "CloudWatchEventRule": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "queue": {
    "errorsQueue": {
      "QueueARN": "string",
      "QueueName": "string",
      "QueueURL": "string"
    }
  }
}