// Original file: ../grpc-api/src/main/proto/greeting.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GreetingRequest as _com_practicetest_grpc_GreetingRequest, GreetingRequest__Output as _com_practicetest_grpc_GreetingRequest__Output } from '../../../com/practicetest/grpc/GreetingRequest';
import type { GreetingResponse as _com_practicetest_grpc_GreetingResponse, GreetingResponse__Output as _com_practicetest_grpc_GreetingResponse__Output } from '../../../com/practicetest/grpc/GreetingResponse';

export interface GreetingServiceClient extends grpc.Client {
  greeting(argument: _com_practicetest_grpc_GreetingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  greeting(argument: _com_practicetest_grpc_GreetingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  greeting(argument: _com_practicetest_grpc_GreetingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  greeting(argument: _com_practicetest_grpc_GreetingRequest, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  greeting(argument: _com_practicetest_grpc_GreetingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  greeting(argument: _com_practicetest_grpc_GreetingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  greeting(argument: _com_practicetest_grpc_GreetingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  greeting(argument: _com_practicetest_grpc_GreetingRequest, callback: grpc.requestCallback<_com_practicetest_grpc_GreetingResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GreetingServiceHandlers extends grpc.UntypedServiceImplementation {
  greeting: grpc.handleUnaryCall<_com_practicetest_grpc_GreetingRequest__Output, _com_practicetest_grpc_GreetingResponse>;
  
}

export interface GreetingServiceDefinition extends grpc.ServiceDefinition {
  greeting: MethodDefinition<_com_practicetest_grpc_GreetingRequest, _com_practicetest_grpc_GreetingResponse, _com_practicetest_grpc_GreetingRequest__Output, _com_practicetest_grpc_GreetingResponse__Output>
}
