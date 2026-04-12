

export interface ProfileResponseModel {
    success?: boolean;
    message?: string;
    data?: {
        id?: string;
        name?: string;
        email?: string;
        mobile?: string;
        role?: string;
        status?: string;
        total_room_search?: number;
        total_uploads?: number;
        isEmailVerified?: boolean;
        createdAt?: string;
        updatedAt?: string;
    } | null;
    errors?: null;
    statusCode?: number;
}

export interface CreditResponseModel {
    success?: boolean;
    message?: string;
    data?: {
        id?: string;
        user_id?: string;
        credits?: number;
        createdAt?: string;
        updatedAt?: string;
    } | null;
    errors?: null;
    statusCode?: number;
}