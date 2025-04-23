import path from "path";

export const getFullPathFile = (
  directory: string,
  filename: string
): string => {
  return path.join(directory, filename);
};
