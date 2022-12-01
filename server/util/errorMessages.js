module.exports = {
    maxLength: (name, length) => `${name} cannot exceed length of ${length} symbols`,
    minLength: (name, length) => `${name} must be at least ${length} symbols long`,
    unique: (name, value) => `${name} "${value}" already exists`,
    invalid: (name, value) => `${value} is not a valid ${name}`,
    required: (name) => `${name} cannot be empty`,
    notFound: (name) => `${name} not found`
}