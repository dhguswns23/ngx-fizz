export class NotAvailableStateError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'NotAvailableStateError';
        Object.setPrototypeOf(this, NotAvailableStateError.prototype);
    }
}

export class NotSupportedMethodError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'NotSupportedMethodError';
        Object.setPrototypeOf(this, NotSupportedMethodError.prototype);
    }
}

export class CantCallableError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'CantCallableError';
        Object.setPrototypeOf(this, NotSupportedMethodError.prototype);
    }
}

