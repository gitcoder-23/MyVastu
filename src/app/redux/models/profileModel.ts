

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