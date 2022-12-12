import errorMessages from "./errorMessages";

export function getError(errors: {} | null, name: string = 'Value', customMessages: any = {}): string {
    if (!errors) {
        return '';
    }

    const [errName, value]: [string, any] = Object.entries(errors)[0];

    if (customMessages[errName]) {
        if (typeof (customMessages[errName] === 'string')) {
            return customMessages[errName];
        }

        return customMessages[errName](name, value);
    }

    switch (errName) {
        case 'maxlength':
            return errorMessages.maxlength(name, value.requiredLength);
        case 'minlength':
            return errorMessages.minlength(name, value.requiredLength);
        case 'max':
            return errorMessages.max(name, value.max);
        case 'min':
            return errorMessages.min(name, value.min);
        case 'required':
            return errorMessages.required(name);
        case 'email':
            return errorMessages.invalid(name);
        case 'pattern':
            return errorMessages.invalid(name);
        case 'matchinput':
            return errorMessages.matchinput(name)
        default:
            return errorMessages.invalid(name);
    }
}

