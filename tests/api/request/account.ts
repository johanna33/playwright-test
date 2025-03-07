import apiPaths from "../../common/api/api-paths";
import { ApiMethod, ApiRequest } from "../../common/interfaces/api-interface";
import { executeRequest } from "../../common/api/api-request";

export async function getAccounts(customerId: string) {
    const apiRequest: ApiRequest = {
        requestUrl: `${apiPaths.baseUrl}${apiPaths.customers}${customerId}/${apiPaths.account}`,
        method: ApiMethod.GET,
        requestOptions: {},
        failStatus: true,
        printOptions: {
            printRequest: true,
            printResponseBody: true,
        },
    }
    return await executeRequest(apiRequest);
};
