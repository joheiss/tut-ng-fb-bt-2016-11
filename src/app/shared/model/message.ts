export type MessageType = "I" | "E" | "S" | "W";

export class Message {

    constructor(public type: MessageType,
                public text: string) {}
}
