import { type APIRequestContext } from "@playwright/test";

/**
 * Interface representing an API request configuration
 * @property requestUrl - The URL to perform the request against
 * @property method - The HTTP request method (GET, POST, PUT, DELETE)
 * @property requestOptions - Request configuration options like body, headers etc.
 * @property requestContext - Optional Playwright APIRequestContext for request customization
 * @property failStatus - If true, test fails on error; if false, test continues
 * @property printOptions - Optional logging configuration for request/response details
 */
export interface ApiRequest {
    requestUrl: string;
    method: string;
    requestOptions: object;
    requestContext?: APIRequestContext;
    failStatus?: boolean;     //TODO check if can make optional
    printOptions?: PrintOptions;
}

export interface PrintOptions {
    printRequest?: boolean;
    printResponseBody?: boolean;
    printPayload?: boolean;
}

export enum ApiMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
}