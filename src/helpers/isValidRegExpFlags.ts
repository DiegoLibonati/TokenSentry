export const isValidRegExpFlags = (flags: string): boolean => {
  return /^[gimsuy]*$/.test(flags);
};
