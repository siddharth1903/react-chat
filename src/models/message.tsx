export interface Message {
    id: string;
    from: string;
    to: string;
    time: Date;
    text: string;
    is_read: boolean;
}

export interface MessageContext extends Message {
    senderOrReceiver: 'SENDER' | 'RECEIVER';
}
