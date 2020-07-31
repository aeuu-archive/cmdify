export const is = (got: Function, type: Function): boolean =>
  got === type || got.prototype instanceof type
