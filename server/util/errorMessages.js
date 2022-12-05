module.exports = {
    maxLength: (name, length) => `${name} cannot be longer than ${length} symbols`,
    minLength: (name, length) => `${name} must be at least ${length} symbols long`,
    max: (name, bound) => `${name} cannot be higher than ${bound}`,
    min: (name, bound) => `${name} cannot be lower than ${bound}`,
    unique: (name, value) => `${name} "${value}" already exists`,
    invalid: (name, value) => `${value} is not a valid ${name}`,
    required: (name) => `${name} cannot be empty`,
    notFound: (name) => `${name} not found`,
    invalidSession: () => 'Session expired. Please sign in again'
}