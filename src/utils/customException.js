export class CustomException extends Error{
    /**
     *
     */
    constructor(status,messsage) {
        super(messsage);
        this.status = status
    }
}