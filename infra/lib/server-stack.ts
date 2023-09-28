import { Stack, type StackProps } from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'

export class ServerStack extends Stack {
  readonly ec2Instance
  constructor (scope: Construct, id: string, stageName: string, vpc: ec2.Vpc, props?: StackProps) {
    super(scope, id, props)
    console.log(`Log Server stack for current stage name: ${stageName}`)

    const cfnKeyPair = new ec2.CfnKeyPair(this, `practice-test-ec2-key-pair-${stageName}`,
      { keyName: `practice-test-ec2-key-pair-${stageName}` })

    const webserverSG = new ec2.SecurityGroup(this, `webserver-sg-${stageName}`, {
      vpc
    })

    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow SSH access from anywhere'
    )

    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(8080),
      'allow HTTP traffic from anywhere'
    )

    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'allow HTTPS traffic from anywhere'
    )

    const ec2ServerRole = new iam.Role(this, `ec2-server-role-${stageName}`, {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess')
      ]
    })

    this.ec2Instance = new ec2.Instance(this, `ec2-instance-${stageName}`, {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      },
      securityGroup: webserverSG,
      role: ec2ServerRole,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
      keyName: cfnKeyPair.keyName
      // init: ec2.CloudFormationInit.fromConfigSets({
      //   configSets: {
      //     default: ['yumPreinstall', 'config']
      //     // default: ['yumPreinstall']
      //   },
      //   configs: {
      //     yumPreinstall: new ec2.InitConfig([
      //       ec2.InitCommand.shellCommand('sudo yum update -y')
      //       // ec2.InitPackage.yum('docker'),
      //       // ec2.InitService.enable('docker')
      //     ]),
      //     config: new ec2.InitConfig([
      //       ec2.InitFile.fromAsset('/home/ec2-user/server-0.0.1-SNAPSHOT.jar', '../server/target/server-0.0.1-SNAPSHOT.jar')
      //       // ec2.InitFile.fromFileInline('/home/ec2-user/envoy.yaml', '../server/envoy.yaml'),
      //       // ec2.InitFile.fromFileInline('/home/ec2-user/envoy-start.sh', '../server/envoy-start.sh'),
      //       // ec2.InitCommand.shellCommand('java -jar /home/ec2-user/server-0.0.1-SNAPSHOT.jar')
      //       // ec2.InitCommand.shellCommand('sh /home/ec2-user/envoy-start.sh')
      //     ])
      //   }
      // })
    })
  }
}
