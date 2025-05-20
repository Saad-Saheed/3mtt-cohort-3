const isPositiveInteger = (value) => {
    return Number.isInteger(value) && value > 0;
};

const isValidString = (value, minLength = 1) => {
    return typeof value === "string" && value.trim().length >= minLength;
};

const isValidNumber = (value) => {
    return typeof value === "number" && value > 0;
};

export { isPositiveInteger, isValidString, isValidNumber };