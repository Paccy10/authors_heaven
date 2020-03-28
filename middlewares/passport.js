import passport from 'passport';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import dotenv from 'dotenv';

dotenv.config();

// Google oauth strategy
passport.use(
    'google',
    new GooglePlusTokenStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = {
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value
            };
            done(null, user);
        }
    )
);
