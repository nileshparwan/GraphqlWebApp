import axios, { AxiosResponse, AxiosError } from 'axios';
import { axiosErrorManagement } from '@utils/axiosErrorManagement';
import { Iresp, Iuser } from '@interfaces';

export const getUserById = async (url: string): Promise<Iresp<Iuser>> => {
    try {
        const resp: AxiosResponse = await axios.get(url);
        const { status, statusText, data } = resp;
        return {
            status,
            statusText,
            data
        }
    } catch (error) {
        const newError = error as AxiosError<unknown, any> | Error;
        return axiosErrorManagement(newError);
    }
}