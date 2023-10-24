import axios, { AxiosError, AxiosResponse } from "axios"
import { axiosErrorManagement } from '@utils/axiosErrorManagement';

export const getCompanyByid = async (url: string) => {
    try {
        const resp:AxiosResponse = await axios.get(url); 
        return resp.data
    } catch (error) {
        const newError = error as AxiosError<unknown, any> | Error;
        return axiosErrorManagement(newError);
    }
}