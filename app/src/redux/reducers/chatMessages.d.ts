declare const chatMessages: (state: ChatMessageModel[], action: {
    type: any;
    messageContent: ChatMessageModel;
}) => ChatMessageModel[];
export default chatMessages;
