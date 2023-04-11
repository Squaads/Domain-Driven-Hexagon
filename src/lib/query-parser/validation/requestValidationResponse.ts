export class RequestValidationResponse {
    private message: string;
    private success: boolean;
    private failedData: Record<string, string>[];

    static createSuccessResponse(): RequestValidationResponse {
        return new RequestValidationResponse(true, 'Validation passes', null);
    }

    static createFailedResponse(failedData: Record<string, string>[]): RequestValidationResponse {
        return new RequestValidationResponse(false, 'Validation failed', failedData);
    }

    private constructor(success: boolean, message: string, failedData: Record<string, string>[]) {
        this.message = message;
        this.success = success;
        this.failedData = failedData;
    }

    public getMessage():string {
        return this.message;
    }

    public isSuccess():boolean {
        return this.success;
    }

    public isFailure():boolean {
        return this.success === false;
    }

    public getFailedData(): Record<string, string>[] {
        return this.failedData;
    }
}
