import axios, { AxiosError } from "axios";

export const axiosErrorManagement = (error: AxiosError<unknown, any> | Error) => {
    if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const axiosError = error as AxiosError<unknown, any>;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return Promise.reject({
                status: error.response.status,
                message: axiosError.message,
                code: error.code
            })
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return Promise.reject({ status: 500, message: "Request made, but no response received. Possible network error." })
        }
        return Promise.reject({
            status: 404,
            message: "Axios error"
        });
    } else if (error instanceof Error) {
        // Other types of errors
        return Promise.reject({
            status: 404,
            message: error.message
        });
    } else {
        // Non-error cases
        return Promise.reject({
            status: 500,
            message: "Unknown error occurred"
        });
    }
}