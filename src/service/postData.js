import instance from "./createAPI";
import { v4 as uuidv4 } from "uuid";

export const postData = async (path, body) => {
  return await instance.post(path, {
    id: uuidv4(),
    name: body.name,
    age: body.age,
    gender: body.gender,
    dateOfBirth: body.dateOfBirth,
    address: body.address,
    email: body.email,
    phone: body.phone,
    hobby: body.hobby,
    isGraduate: body.isGraduate,
    country: body.country,
  });
};
