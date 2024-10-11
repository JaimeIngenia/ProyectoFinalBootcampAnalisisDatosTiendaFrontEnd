export const createMaxLengthRegex = maxLength =>
  new RegExp(`^[\\s\\S]{0,${maxLength}}$`);

export const createMaxLengthNoNumbersRegexResponsibilities = maxLength =>
  new RegExp(`^(?!^[\\d\\W]+$)[\\s\\S]{0,${maxLength}}$`);

export const containsOnlyNumbers = value => /^[0-9]+$/.test(value);

export const containsSymbols = value =>
  /[^a-zA-Z0-9\s.,áéíóúüÁÉÍÓÚÜñÑ]/.test(value);

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const maxLengthRegex = maxLength => new RegExp(`^.{0,${maxLength}}$`);

export const yearRangeValidation = name => value => {
  const yearRegex = /^(0|[1-9]\d{0,3}|2024)$/;
  return yearRegex.test(value)
    ? Promise.resolve()
    : Promise.reject(`Invalid year range for ${name}`);
};

export const noNumbersRegex = /^[^\d]+$/;

export const createMaxLengthNoNumbersRegex = maxLength =>
  new RegExp(`^(?!.*[\\d\\W])[\\s\\S]{0,${maxLength}}$`);

export const validateLength = (value, minLength, maxLength) => {
  if (value.length < minLength || value.length > maxLength) {
    return `Length should be between ${minLength} and ${maxLength} characters`;
  }
  return null;
};

export const minLengthRegex = /^(.|\s){3,}$/;

export const minLengthRegexSkills = /^(.|\s){2,}$/;

export const containsAllowedSymbolsForSkills = value =>
  /[^a-zA-Z0-9\s.,áéíóúüÁÉÍÓÚÜñÑ\s#]+$/.test(value);

export const bulletRegex = /•\s+/;
