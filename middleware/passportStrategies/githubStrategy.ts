import passport from 'passport';
import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { IUser, PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import dotenv from 'dotenv';
import { userModel } from '../../models/userModel';

dotenv.config();

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: process.env.GITHUB_CALLBACK_URL || "",
        passReqToCallback: true,
    },
    
    /* FIXED ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
        console.log(profile);

        const GitHubUser : IUser = {
            id: Number(profile.id),
            username: profile.username ?? "",
            name: profile.name?.givenName ?? "",
            email: profile.emails?.[0]?.value ?? "",
            password: "",
            role: "user",
            strategy: "github",
            strategy_id: profile.id
        };

        const user = userModel.findByIdOrCreate(null, "github", GitHubUser);
        console.log(`GitHub user with id: ${user.id} logged in`);

        return done(null, user);
    },
);



const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
