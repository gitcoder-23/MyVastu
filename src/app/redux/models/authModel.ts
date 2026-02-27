export interface AuthResponseModel {
    status: boolean;
    code?: number;
    message?: string;
    data?: any;
}