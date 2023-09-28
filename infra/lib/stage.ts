import { Stage } from 'aws-cdk-lib'
import type { StageProps } from 'aws-cdk-lib'
import type { Construct } from 'constructs'
import { ClientStack, webArtifactsPath } from './client-stack'
import { ServerStack } from './server-stack'
import * as fs from 'fs'
import { VpcStack } from './vpc-stack'
import { type Environment } from 'aws-cdk-lib/core/lib/environment'

// Main deployment setup. Collection of the stacks and deployment sequence
export class Deployment extends Stage {
  constructor (scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props)

    const vpcStack = new VpcStack(this, `VpcStack-${this.stageName}`, this.stageName, {
      description: 'This is the vpc stack in ' + this.stageName + 'stage.',
      env: props?.env
    })

    // Deploy the server stack
    const serverStack = new ServerStack(this,
        `ServerStack-${this.stageName}`,
        this.stageName,
        vpcStack.vpc,
        {
          description: 'This is the server stack in ' + this.stageName + 'stage.',
          env: props?.env
        })

    const createClientStack = (env: Environment): void => {
      // Deploy the client stack in the Deployment stage
      new ClientStack(this, `ClientStack-${this.stageName}`, this.stageName, {
        description: 'This is the client stack with IaC in ' + this.stageName + 'stage.',
        env
      })
    }

    this.updateClientEndpoint(webArtifactsPath + '/static/js', serverStack.ec2Instance.instancePublicIp, createClientStack)
  }

  updateClientEndpoint (webArtifactsPath: string, endpointIp: string, callback: ((env: Environment) => void)): void {
    console.log('start updating web endpoint:')
    fs.readdir(webArtifactsPath, (err, files) => {
      if (err != null) {
        console.log(err)
      }
      let filesWithEndpoint: string[] = []
      files.forEach(file => {
        console.log(file)
        if (file.endsWith('js') || file.endsWith('.js.map')) {
          filesWithEndpoint.push(file)
        }
      })
      
    })
  }
}
