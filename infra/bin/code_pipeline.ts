#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CodePipelineStack } from '../lib/pipeline-stack'

const app = new cdk.App()
new CodePipelineStack(app, 'CodePipeline', { env: { account: '757915757837', region: 'us-west-2' } })
