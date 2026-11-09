import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  const errorMessage = req.session.messages ? req.session.messages[req.session.messages.length -1] : null;  
  console.log(`${req.session.messages}`);
  res.render("login", {name: "John", errorMessage: errorMessage});
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
    /* FIXED ME: 😭 failureMsg needed when login fails */
  })
);

router.get('/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    prompt: 'consent'
  })
);

router.get('/github/callback', 
  passport.authenticate('github', { 
    successRedirect: '/dashboard/',
    failureRedirect: '/authlogin',
    failureMessage: true })  
);


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
