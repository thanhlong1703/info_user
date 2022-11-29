import instance from "./createAPI";

export const delData = async (path, body) => {
    return await instance.delete(path);
  };