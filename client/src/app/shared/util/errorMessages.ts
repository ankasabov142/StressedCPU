export default {
    maxlength: (name: string, length: number) => `${name} cannot be longer than ${length} symbols`,
    minlength: (name: string, length: number) => `${name} must be at least ${length} symbols long`,
    max: (name: string, bound: number) => `${name} cannot be higher than ${bound}`,
    min: (name: string, bound: number) => `${name} cannot be lower than ${bound}`,
    isinteger: (name: string) => `${name} must be a whole number`,
    unique: (name: string) => `${name} already exists`,
    invalid: (name: string) => `Not a valid ${name}`,
    required: (name: string) => `${name} cannot be empty`,
    notfound: (name: string) => `${name} not found`,
    matchinput: (name: string) => `Field does not match ${name}`
}