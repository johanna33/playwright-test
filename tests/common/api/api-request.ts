import { APIResponse, request } from "@playwright/test";
import { ApiRequest, logOptions } from "../interfaces/api-interface";

/**
 * Perform a request to the API and return the response.
 */
export async function executeRequest(apiRequest: ApiRequest) {
    let response: APIResponse;
    try {
        const context = apiRequest.requestContext || (await request.newContext({ storageState: "./session.json" }));
        response = await context[apiRequest.method](apiRequest.requestUrl, apiRequest.requestOptions);
        const responseCode = await response.status();
        const responseOk = await response.ok();

        if (!responseOk) {
            const errorStatus = `Code: ${responseCode} \r\n`;
            const responseStatus = `Status: ${responseOk} \r\n`;
            const errorResponse = `Response: ${await response.text()} \r\n`;
            throw new Error(`${errorStatus} ${errorResponse} ${responseStatus}`);
        }

        logRequestDetails(apiRequest, response);
        return response;

    } catch (error) {
        return handleFailure(apiRequest, error, response!);
    }
}

async function logRequestDetails(apiRequest: ApiRequest, response: APIResponse) {
    const { logOptions , requestUrl, method, requestOptions } = apiRequest;
    if (logOptions) {
        if (logOptions.logRequest) {
            console.log(`Request ${method} to ${requestUrl}`);
            console.log(`Request status ${response.status()}`);
        }
        if (logOptions.logPayload) {
            console.log(`Payload is ${JSON.stringify(requestOptions)}`);
        }
        if (logOptions.logResponseBody) {
            console.log(`Response body ${await response.json()}`);
        }
    }
}

async function handleFailure(apiRequest: ApiRequest, error: Error, response: APIResponse) {
    const { failStatus, requestUrl, method, requestOptions } = apiRequest;
    if (failStatus) {
        const errorRequestUrl = `Request url: ${requestUrl} \r\n`;
        const errorRequestMethod = `Method: ${method} \r\n`;
        const errorRequestOptions = `Request options: ${JSON.stringify(requestOptions)} \r\n`;
        const errorMessage = `Error: ${error} \r\n`;
        throw new Error(
            `Invalid request! Failed on 'executeRequest' method. \r\n ${errorRequestUrl} ${errorRequestMethod} ${errorRequestOptions} ${errorMessage}`
        );
    } else {
        return createErrorResponse(requestUrl, error, response);
    }
}

function createErrorResponse(requestUrl: string, error: Error, response: APIResponse) {
    return {
        ok: () => false,
        body: () => Promise.reject(error),
        dispose: async () => {
            console.log("Disposing response");
        },
        headers: () => ({ error: "error" }),
        headersArray: () => [{ name: "Content-Type", value: "application/json" }],
        json: async () => {
            return await response.json();
        },
        status: () => response.status(),
        statusText: () => error.message,
        text: async () => {
            return error.message;
        },
        url: () => requestUrl,
        [Symbol.asyncDispose]: async () => {
            console.log("Async disposing response");
        },
    };
}

