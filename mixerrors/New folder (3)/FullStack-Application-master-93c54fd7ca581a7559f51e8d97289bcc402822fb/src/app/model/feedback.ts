export interface Feedback {
    query: string;
    comment: string;
    user: string;
    oldIntent?: string;
    userResp: string;
}
