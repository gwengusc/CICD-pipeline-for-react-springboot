# Execute a sequence of actions
all: warming build linting security unittest cooling

warming-grpc-api:
	cd grpc-api && ./mvnw clean install

warming-server:
	cd server && ./mvnw clean install

warming-client:
	cd client && npm i

warming-infra:
	cd infra && npm i

# Pipeline sequence
## The warming step pre-warms the environment with:
warming:
	@echo "Start the project building"
	cd client && npm i && cd ../infra && npm i

## This step builds applications and creates deliverable items
build:
	cd grpc-api && ./mvnw clean install && cd ../server && ./mvnw clean install && cd ../client && npm run build && cd ../infra && npm run cdk synth

## This step checks the code base with linting tools
linting:
	cd client && npm run eslint && cd ../infra && npm run eslint-check

## This step checks the code base with security tools
security:
	cd infra && cfn_nag_scan -i ./cdk.out -t ..\*.template.json

## This step executes unit tests for the code base
unittest:
	cd infra && npm run test

## This step cleans up the environment from the secret values
cooling:
	@echo "Finish the project building"

# Manual execution
## Cleanup the whole environment. Remove all temporary files
clean:
	git clean -xdf
## Deploy application to the AWS account.
deploy:
	cd infra && npm run cdk -- deploy Dev-* --require-approval never
## Execute integration tests for verification
validate:
	cd infra && ./test/test_validate.sh
destroy:
	cd infra && npm run cdk destroy --all

##rm -rf infra/node_modules/ infra/package-lock.json infra/resources/ client/node_modules/ client/package-lock.json .idea/workspace.xml infra/cdk.out/ infra/coverage/