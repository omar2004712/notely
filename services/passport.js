const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const keys = require('../config/keys');
const User = require('mongoose').model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        async (_, __, profile, done) => {
            const user = await User.findOne({ googleID: profile.id });

            if (user) {
                // user exists
                // skip creation process
                return done(null, user); // fix: done does not terminate the function
            }

            const newUser = await new User({
                googleID: profile.id,
                name: `${profile.name.givenName}_${profile.name.familyName}`,
            }).save();

            done(null, newUser);
        }
    )
);
