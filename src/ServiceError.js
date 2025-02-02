class ServiceError extends Error {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   */
  constructor(statusCode, message) {
    super(message);

    this.name = "ServiceError";
    this.statusCode = statusCode;
  }
}

export default ServiceError;
