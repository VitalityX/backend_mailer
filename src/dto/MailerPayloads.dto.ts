export namespace MailerPayloads {
    export class BasePayload {
        constructor(public username: string, public email: string) {}
    
        toString(){
            return JSON.stringify(this);
        }
    }
    
    export class EmailVerificationPayload extends BasePayload {
        constructor(public username: string, public email: string, public code: number) {
            super(username, email);
        }
    }    
}
