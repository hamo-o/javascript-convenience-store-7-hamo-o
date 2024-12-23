class ValidationError extends Error {
  constructor(message) {
    super(`[ERROR] ${message}\n`);
    this.name = this.constructor.name;
  }
}

export default ValidationError;
