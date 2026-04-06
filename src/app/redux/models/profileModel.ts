

export interface ProfileResponseModel {
    success?: boolean;
    message?: string;
    data?: {
        id?: string;
        name?: string;
        email?: string;
        mobile?: string;
        role?: string;
        isEmailVerified?: boolean;
        createdAt?: string;
        updatedAt?: string;
    } | null;
    errors?: null;
    statusCode?: number;
}