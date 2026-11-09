import { IUser } from "../interfaces";
import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);

  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id:number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: IUser, password: string) {
  if ( user.password !== password ) {
    throw new Error(`Password is incorrect.`);
  }

  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
