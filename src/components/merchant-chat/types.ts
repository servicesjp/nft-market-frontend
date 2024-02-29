export interface ListResult<T> {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    items: T[];
}

export interface ChatInvitation {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    guestMeteorUserId: string;
    hostMeteorUserId: string;
    accepted: boolean;
}


export interface Chat {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    metadata: {
        invitationId: string;
        meteorUserIds: string[];
        productId: string;
    };
}

export interface ChatMessage {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    chat: string;
    meteorUserId: string;
    message: string;
    expand: {
        attachedFile: any
    },
    attachedFile: string;
}

export interface ChatMessageDto {
    chat: string;
    meteorUserId: string;
    message: string;
}

export interface UserProfile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatarUrl: string;
    country: string;
    state: string;
    city: string;
}