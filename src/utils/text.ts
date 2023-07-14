export const limitWord = (text: string, limit: number) => {
  if (text) {
    if (text?.length > limit) {
      return text?.substring(0, limit) + "...";
    }
    return text;
  }
};
