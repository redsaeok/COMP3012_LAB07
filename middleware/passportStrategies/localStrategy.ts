import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';
import { IUser } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {    
    let user: IUser | null = null;
    let errorMessage : string | null = "Unexpected error occurred during login. Please try again.";

    try {
      user = getUserByEmailIdAndPassword(email, password);
    } catch (error) {
      errorMessage = (error as Error).message;
    }
    finally {
      return user
        ? done(null, user)
        : done(null, false, {
            message: errorMessage,
          });
    }
  }
);


passport.serializeUser(function (user: Express.User, done: (err: any, id?: unknown) => void){
  done(null, user.id);
});


/*
FIXED ME (types) 😭
*/
passport.deserializeUser(function (id: number, done: (err: any, user?: Express.User) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, undefined);
  }

});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
