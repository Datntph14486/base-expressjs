class ApiError extends Error {
    statusCode: number;
    detail: any;

    constructor(statusCode: number, message: string, detail?: any) {
        super(message);
        this.statusCode = statusCode;
        this.detail = detail;
    }
}

export default ApiError;
