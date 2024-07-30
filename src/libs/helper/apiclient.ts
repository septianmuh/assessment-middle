import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse {
    data: any;
    message: string;
    status: 'SUCCESS' | 'ERROR';
    code: number
}

export interface ApiError {
    error: any;
    message: string;
    status: 'ERROR';
    code: number
}

class ApiClient {

    private token: string | null = null;
    constructor() {
        this.token = ""
    }

    setToken(token: string) {
        this.token = token;
    }

    handleErrorResponse(error: AxiosError): ApiError {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            switch (status) {
                case 400:
                    console.error('Bad Request:', data);
                    break;
                case 401:
                    console.error('Unauthorized:', data);
                    break;
                case 403:
                    console.error('Forbidden:', data);
                    break;
                case 404:
                    console.error('Not Found:', data);
                    break;
                case 500:
                    console.error('Internal Server Error:', data);
                    break;
                default:
                    console.error('Unknown Error:', data);
                    break;
            }
            return {
                error: data,
                message: 'Request failed',
                status: 'ERROR',
                code: status,
            };
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Request Error:', error);
        }
        return {
            error: error,
            message: 'Request failed',
            status: 'ERROR',
            code: 422,
        };
    }

    async get(url: string, config?: AxiosRequestConfig): Promise<ApiResponse> {
        try {
            let headers: Record<string, string> = {
                'Accepts': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }

            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`
            }
            if (!config) config = {};
            config.headers = headers;
            // config.withCredentials = this.token ? true : false;

            const response: AxiosResponse = await axios.get(process.env.BASE_URL + url, config);
            return {
                data: response.data?.data,
                message: response.data?.message || 'Request successful',
                status: response.data?.status || 'SUCCESS',
                code: response.status,
            };
        } catch (error) {
            const apiError = this.handleErrorResponse(error as AxiosError);
            throw apiError;
        }
    }

    async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse> {
        try {
            let headers: Record<string, string> = {
                'Accepts': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }

            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`
            }
            if (!config) config = {};
            config.headers = headers;
            // config.withCredentials = this.token ? true : false;

            const response: AxiosResponse = await axios.post(process.env.BASE_URL + url, data, config);
            return {
                data: response.data?.data,
                message: response.data?.message || 'Request successful',
                status: response.data?.status || 'SUCCESS',
                code: response.status,
            };
        } catch (error) {
            const apiError = this.handleErrorResponse(error as AxiosError);
            throw apiError;
        }
    }

    async uploadFile(url: string, file: File, dataForm: Record<string, any>, method: string, config?: AxiosRequestConfig): Promise<ApiResponse> {
        try {
            let headers: Record<string, string> = {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        
            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`
            }
            if (!config) config = {};
            config.headers = headers;
            // config.withCredentials = this.token ? true : false;
        
            const formData = new FormData();
            formData.append('file', file);
        
            Object.entries(dataForm).forEach(([key, value]) => {
                formData.append(key, value);
            });
            
            let response = {} as AxiosResponse
            if(method === 'post'){
                response = await axios.post(process.env.BASE_URL + url, formData, config);
            }else {
                response = await axios.put(process.env.BASE_URL + url, formData, config);
            }
            return {
                data: response.data?.data,
                message: response.data?.message || 'Request successful',
                status: response.data?.status || 'SUCCESS',
                code: response.status,
            };
        } catch (error) {
            const apiError = this.handleErrorResponse(error as AxiosError);
            throw apiError;
        }
    }

    async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse> {
        try {
            let headers: Record<string, string> = {
                'Accepts': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }

            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`
            }
            if (!config) config = {};
            config.headers = headers;
            // config.withCredentials = this.token ? true : false;

            const response: AxiosResponse = await axios.put(process.env.BASE_URL + url, data, config);
            return {
                data: response.data?.data,
                message: response.data?.message || 'Request successful',
                status: response.data?.status || 'SUCCESS',
                code: response.status,
            };
        } catch (error) {
            console.log(error)
            const apiError = this.handleErrorResponse(error as AxiosError);
            throw apiError;
        }
    }

    async del(url: string, config?: AxiosRequestConfig): Promise<ApiResponse> {
        try {
            let headers: Record<string, string> = {
                'Accepts': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }

            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`
            }
            if (!config) config = {};
            config.headers = headers;
            // config.withCredentials = this.token ? true : false;

            const response: AxiosResponse = await axios.delete(process.env.BASE_URL + url, config);
            return {
                data: response.data?.data,
                message: response.data?.message || 'Request successful',
                status: response.data?.status || 'SUCCESS',
                code: response.status,
            };
        } catch (error) {
            const apiError = this.handleErrorResponse(error as AxiosError);
            throw apiError;
        }
    }

    async downloadFile( url: string, method: string, fileName: string, body: any, config?: AxiosRequestConfig): Promise<void> {
        try {
            let headers: Record<string, string> = {
                'Accepts': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };
            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`;
            }

            if (!config) config = {};
            config.headers = headers;
            // config.withCredentials = this.token ? true : false;
            config.responseType = 'blob';

            let response = {} as AxiosResponse;
            const apiUrl = process.env.BASE_URL + url;
            if (method.toLowerCase() === 'get') {
                response = await axios.get(apiUrl, config);
            } else if (method.toLowerCase() === 'post') {
                response = await axios.post(apiUrl, body, config);
            } else {
                throw new Error(`Unsupported method: ${method}`);
            }

            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urlBlob;

            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        } catch (error) {
            const apiError = this.handleErrorResponse(error as AxiosError);
            throw apiError;
        }
    }
}

export default new ApiClient();
