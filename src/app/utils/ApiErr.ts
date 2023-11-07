export class ApiErr extends Error {
    private statusCode: number;
    constructor(statusCode: number, name: string, message?: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}