import { RequestValidationResponse } from './requestValidationResponse';

describe('types of responses', () => {
    it('should create a success response', () => {
        const response = RequestValidationResponse.createSuccessResponse();
        expect(response.isSuccess()).toBe(true);
        expect(response.isFailure()).toBe(false);
        expect(response.getMessage()).toBe('Validation passes');
        expect(response.getFailedData()).toBeNull();
    });

    it('should create a failure response', () => {
        const response = RequestValidationResponse.createFailedResponse([]);
        expect(response.isSuccess()).toBe(false);
        expect(response.isFailure()).toBe(true);
        expect(response.getMessage()).toBe('Validation failed');
        expect(response.getFailedData()).toEqual([]);
    });
});
