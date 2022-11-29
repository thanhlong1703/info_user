import instance from "./createAPI";

export const getData = async (path, option) => {
  const respone = await instance.get(path);
  return respone.data;
};
