export interface Message {
    id: string;
    from: string;
    to: string;
    time: Date;
    text: string;
    is_read: boolean;
    user_context: 'SENDER' | 'RECEIVER';
}


export interface MessageTemplate extends Message {
    picture?: string;
    userName?: string;
}