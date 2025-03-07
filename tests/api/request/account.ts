import apiPaths from "../../common/api/api-paths";
import { ApiMethod, ApiRequest } from "../../common/interfaces/api-interface";
import { executeRequest } from "../../common/api/api-request";
import { getCustomerPayloadInFormUrlEncoded } from "../../common/payloads/customer";

export async function getAccounts(customerId: string) {
    const apiRequest: ApiRequest = {
        requestUrl: `${apiPaths.baseUrl}${apiPaths.customers}${customerId}/${apiPaths.account}`,
        method: ApiMethod.GET,
        requestOptions: {},
        failStatus: true,
        logOptions: {
            logRequest: true,
            logResponseBody: true,
        },
    }
    return await executeRequest(apiRequest);
};

export async function getAccountDetails(accountId: string) {
    const apiRequest: ApiRequest = {
        requestUrl: `${apiPaths.baseUrl}${apiPaths.account}/${accountId}`,
        method: ApiMethod.GET,
        requestOptions: {},
        failStatus: true,
        logOptions: {
            logRequest: true,
        },
    }
    return await executeRequest(apiRequest);
};


export async function updateCustomer(customerId: string) {
    const apiRequest: ApiRequest = {
        requestUrl: `${apiPaths.baseUrl}${apiPaths.updateCustomer}${customerId}`,
        method: ApiMethod.POST,
        requestOptions: getCustomerPayloadInFormUrlEncoded(),
        failStatus: true,
    };
    return await executeRequest(apiRequest);
};





