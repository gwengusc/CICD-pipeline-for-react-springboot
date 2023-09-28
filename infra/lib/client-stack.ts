import { CfnOutput, RemovalPolicy, Stack } from 'aws-cdk-lib'
import type { StackProps } from 'aws-cdk-lib'
import type { Construct } from 'constructs'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3'
import { Distribution, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront'

export const webArtifactsPath = './resources/build'

export class ClientStack extends Stack {
  constructor (scope: Construct, id: string, stageName: string, props?: StackProps) {
    super(scope, id, props)
    // deploy react
    console.log(`Client stack for current stage name: ${stageName}`)

    const hostingBucket = new Bucket(this, `ClientResourceBucket-${stageName}`, {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY
    })

    const distribution = new Distribution(this, `CloudfrontDistribution-${stageName}`, {
      defaultBehavior: {
        origin: new S3Origin(hostingBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html'
        }
      ]
    })

    new BucketDeployment(this, `BucketDeployment-${stageName}`, {
      sources: [Source.asset(webArtifactsPath)],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*']
    })

    new CfnOutput(this, `CloudFrontURL-${stageName}`, {
      value: distribution.domainName,
      description: 'The distribution URL in stage ' + stageName,
      exportName: `CloudFrontURL-${stageName}`
    })

    new CfnOutput(this, `BucketName-${stageName}`, {
      value: hostingBucket.bucketName,
      description: 'The name of the S3 bucket',
      exportName: `BucketName-${stageName}`
    })
  }
}
