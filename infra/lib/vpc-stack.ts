import { Stack, type StackProps } from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { type Construct } from 'constructs'

export class VpcStack extends Stack {
  readonly vpc
  constructor (scope: Construct, id: string, stageName: string, props?: StackProps) {
    super(scope, id, props)
    console.log(`Server stack for current stage name: ${stageName}`)
    this.vpc = new ec2.Vpc(this, `vpc-${stageName}`)
  }
}
