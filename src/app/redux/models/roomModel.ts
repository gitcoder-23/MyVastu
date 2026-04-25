
export interface RoomResponseModel {
    success?: boolean;
    message?: string;
    data?: {
        id?: string;
        address?: string;
        lat?: number;
        lng?: number;
        angle?: number;
        direction?: string;
        user_id?: string;
        created_at?: string;
    } | null;
    error?: null;
    statusCode?: number;
}