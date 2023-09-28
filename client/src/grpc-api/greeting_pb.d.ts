import * as jspb from 'google-protobuf'



export class GreetingRequest extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): GreetingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GreetingRequest): GreetingRequest.AsObject;
  static serializeBinaryToWriter(message: GreetingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetingRequest;
  static deserializeBinaryFromReader(message: GreetingRequest, reader: jspb.BinaryReader): GreetingRequest;
}

export namespace GreetingRequest {
  export type AsObject = {
    message: string,
  }
}

export class GreetingResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): GreetingResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GreetingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GreetingResponse): GreetingResponse.AsObject;
  static serializeBinaryToWriter(message: GreetingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GreetingResponse;
  static deserializeBinaryFromReader(message: GreetingResponse, reader: jspb.BinaryReader): GreetingResponse;
}

export namespace GreetingResponse {
  export type AsObject = {
    message: string,
  }
}

