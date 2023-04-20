export const isEmpty = (val: string | null | undefined) => {
  return val === '' || val === null || val === undefined;
};

export const isFalse = (val: boolean) => !val;
