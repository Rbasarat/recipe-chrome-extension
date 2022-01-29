
export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    id: string,
    content: any
}
