import {GreetingServiceClient} from "./grpc-api/GreetingServiceClientPb";
import {GreetingRequest, GreetingResponse} from "./grpc-api/greeting_pb";

const hostName:string = "http://127.0.0.1:8080"
// const hostName:string = "http://54.218.30.252:8080"

const greetingClient = new GreetingServiceClient(hostName);

function greeting() {
    return new Promise<GreetingResponse>((resolve, reject) => {
        const request = new GreetingRequest();
        request.setMessage("hehe guifan");
        
        greetingClient.greeting(request, null)
            .then((message) => resolve(message))
            .catch((error) => reject(error));
    });
}

export async function runGreeting() {
    const result = await greeting();
    console.log(result.getMessage());
}