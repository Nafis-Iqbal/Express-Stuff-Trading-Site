import {priority, statusEnum, role} from "./Enums";

declare global{
    interface User{
        id: number;
        name: string;
        email: string;
        role: role;
    }

    interface Tag{
        id: number;
        title: string;
    }

    export interface Comments{
        id: number;
        comment: string;
    }

    interface ApiResponse<T>{
        status: string;
        message: string;
        data: T;
    }

    interface Auth{
        auth_token: string;
        user_id: number; 
    }
}

export function isCommentArray(data: any[]): data is Comments[] {
    return Array.isArray(data) && data.every((item) => 'comment' in item);
}

export function isTagArray(data: any[]): data is Tag[] {
    return Array.isArray(data) && data.every((item) => !('comment' in item) && !('progress' in item) && !('project_id' in item && 'priority' in item));
}
