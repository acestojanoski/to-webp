export class ServiceError extends Error {
	name = 'ServiceError';

	/**
	 *
	 * @param {number} statusCode
	 * @param {string} message
	 */
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}

	static isServiceError(error) {
		return error instanceof ServiceError;
	}
}
