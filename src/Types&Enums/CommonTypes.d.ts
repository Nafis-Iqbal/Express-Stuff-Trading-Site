import {priority, role} from "./Enums";

declare global{
    interface User{
        id: number;
        user_name: string;
        email: string;
        password_hash: string;
        bio: string;
        profile_picture: string;
        rating: number;
        credits: number;
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
        email: string;
        id: number; 
    }

    enum role{
        user = "user",
        manager = "manager",
        admin = "admin"
    }
    
    enum listingStatus{
        available = "available",
        sold = "sold",
        cancelled = "cancelled"
    }
    
    enum priority{
        urgent = "urgent",
        normal = "normal"
    }
}

export function isCommentArray(data: any[]): data is Comments[] {
    return Array.isArray(data) && data.every((item) => 'comment' in item);
}

export function isTagArray(data: any[]): data is Tag[] {
    return Array.isArray(data) && data.every((item) => !('comment' in item) && !('progress' in item) && !('project_id' in item && 'priority' in item));
}
