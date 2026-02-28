export interface AuthResponseModel {
    success?: boolean;
    message?: string;
    data?: {
        user?: AuthRegisterUserModel | null,
        tokens?: {
            accessToken?: string,
            refreshToken?: string,
            expiresIn?: number
        }
    } | null;
    error?: null;
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