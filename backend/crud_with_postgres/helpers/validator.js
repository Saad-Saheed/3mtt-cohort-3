const isPositiveInteger = (value) => {
    return Number.isInteger(value) && value > 0;
};

const isValidString = (value, minLength = 1) => {
    return typeof value === "string" && value.trim().length >= minLength;
};

const isValidNumber = (value) => {
    return typeof value === "number" && value > 0;
};

const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof value === "string" && emailRegex.test(value);
};

export { isPositiveInteger, isValidString, isValidNumber, isValidEmail };