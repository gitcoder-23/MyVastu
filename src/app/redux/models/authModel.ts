export interface AuthRegisterResponseModel {
    message?: string;
    user?: AuthRegisterUserModel | null;
    error?: string;
    statusCode?: number;
}

export interface AuthRegisterUserModel {
    id?: string;
    name?: string;
    email?: string;
    mobile?: string;
    role?: string;
    isEmailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
}