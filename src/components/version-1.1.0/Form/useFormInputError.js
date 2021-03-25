export const useFormInputError = ({ errors, id, name }) => {
  const errorText  = errors ? (errors[name] || '') : '';
  const error      = errorText.length ? true : false;
  const errorProp  = error ? { 'aria-describedby': `${id}-error-text` } : {};

  return {errorText, error, errorProp };
};