export const useUndefinedValueHelper = value => (
  (typeof value === 'undefined' || null === value) ? '' : value
);