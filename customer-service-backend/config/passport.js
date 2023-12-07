const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

passport.use(
  // Extract relevant user information from the profile object.
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        // Add other profile fields as needed
      };

      // Check if the user already exists in your database
      // If not, create a new user record
      // Save or update the user record based on your logic

      return done(null, userData);
    }
  )
);
  

module.exports = passport;
