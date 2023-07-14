import { host } from "../redux/host";

export const getImagePath = (image: string | undefined) => {
  if (image) {
    const split = image.split("\\");
    return `${host}/image/${split[split.length - 1]}`;
  }
  return "";
};
