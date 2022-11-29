import instance from "./createAPI";

export const patchData = async (path, body) => {
  return await instance.put(path, {
    name: body?.name,
    age: body?.age,
    gender: body?.gender,
    dateOfBirth: body?.dateOfBirth,
    address: body?.address,
    email: body?.email,
    phone: body?.phone,
    hobby: body?.hobby,
    isGraduate: body?.isGraduate,
    country: body?.country,
  });
};
