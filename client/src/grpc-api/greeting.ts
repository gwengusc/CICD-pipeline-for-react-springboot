import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GreetingServiceClient as _com_practicetest_grpc_GreetingServiceClient, GreetingServiceDefinition as _com_practicetest_grpc_GreetingServiceDefinition } from './com/practicetest/grpc/GreetingService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  com: {
    practicetest: {
      grpc: {
        GreetingRequest: MessageTypeDefinition
        GreetingResponse: MessageTypeDefinition
        GreetingService: SubtypeConstructor<typeof grpc.Client, _com_practicetest_grpc_GreetingServiceClient> & { service: _com_practicetest_grpc_GreetingServiceDefinition }
      }
    }
  }
}

