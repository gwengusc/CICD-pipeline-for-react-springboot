import { Repository } from 'aws-cdk-lib/aws-codecommit'
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines'
import { CfnOutput, Stack } from 'aws-cdk-lib'
import type { StackProps } from 'aws-cdk-lib'
import type { Construct } from 'constructs'
import { Deployment } from './stage'

export class CodePipelineStack extends Stack {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const repo = new Repository(this, 'Repository', {
      repositoryName: 'PracticeTests',
      description: 'This is the repository for the project PracticeTests.'
    })

    const validatePolicy = new PolicyStatement({
      actions: [
        'cloudformation:DescribeStacks'
      ],
      resources: ['*']
    })

    const pipeline = new CodePipeline(this, 'Pipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.codeCommit(repo, 'fixBuild'),
        installCommands: [
          'java -version',
          'echo $JAVA_HOME',
          'make warming'
        ],
        commands: [
          'java -version',
          'echo $JAVA_HOME',
          'make build'
        ],
        primaryOutputDirectory: 'infra/cdk.out'
      }),
      synthCodeBuildDefaults: {
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              'runtime-versions': {
                java: 'corretto11'
              }
            }
          }
        })
      },
      codeBuildDefaults: {
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              'runtime-versions': {
                java: 'corretto11'
              }
            }
          }
        })
      }
    })

    // Add dev deployment
    const devStage = new Deployment(this, 'Dev', { env: props?.env })
    pipeline.addStage(devStage, {
      // Execute all sequence of actions before deployment
      pre: [
        new CodeBuildStep('Linting', {
          installCommands: [
            'make warming'
          ],
          commands: [
            'make linting'
          ]
        }),
        new CodeBuildStep('UnitTest', {
          installCommands: [
            'make warming'
          ],
          commands: [
            'make unittest'
          ],
          partialBuildSpec: BuildSpec.fromObject({
            reports: {
              coverage: {
                files: [
                  './infra/coverage/clover.xml'
                ],
                'file-format': 'CLOVERXML'
              },
              unittest: {
                files: [
                  './infra/test-report.xml'
                ],
                'file-format': 'JUNITXML'
              }
            }
          }),
          rolePolicyStatements: [
            new PolicyStatement({
              actions: [
                'codebuild:CreateReportGroup',
                'codebuild:CreateReport',
                'codebuild:UpdateReport',
                'codebuild:BatchPutTestCases',
                'codebuild:BatchPutCodeCoverages'
              ],
              resources: ['*']
            })
          ]
        }),
        new CodeBuildStep('Security', {
          installCommands: [
            'make warming',
            'gem install cfn-nag'
          ],
          commands: [
            'make build',
            'make security'
          ],
          partialBuildSpec: BuildSpec.fromObject({
            phases: {
              install: {
                'runtime-versions': {
                  ruby: '2.6',
                  java: 'corretto11'
                }
              }
            }
          })
        })
      ],
      // Execute validation check for post-deployment
      post: [
        new CodeBuildStep('Validate', {
          env: {
            STAGE: devStage.stageName
          },
          installCommands: [
            'make warming'
          ],
          commands: [
            'make validate'
          ],
          rolePolicyStatements: [validatePolicy]
        })
      ]
    })
    // Add test deployment
    const testStage = new Deployment(this, 'Test', { env: props?.env })
    pipeline.addStage(testStage, {
      // Execute validation check for post-deployment
      post: [
        new CodeBuildStep('Validate', {
          env: {
            STAGE: testStage.stageName
          },
          installCommands: [
            'make warming'
          ],
          commands: [
            'make validate'
          ],
          rolePolicyStatements: [validatePolicy]
        })
      ]
    })
    // Add prod deployment
    const prodStage = new Deployment(this, 'Prod', { env: props?.env })
    pipeline.addStage(prodStage, {
      // Execute validation check for post-deployment
      post: [
        new CodeBuildStep('Validate', {
          env: {
            STAGE: prodStage.stageName
          },
          installCommands: [
            'make warming'
          ],
          commands: [
            'make validate'
          ],
          rolePolicyStatements: [validatePolicy]
        })
      ]
    })
    // Output
    new CfnOutput(this, 'RepositoryName', {
      value: repo.repositoryName
    })
  }
}
