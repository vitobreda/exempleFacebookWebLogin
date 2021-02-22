import { Router, Request, Response } from "express";
import * as passport from "passport";
import { Strategy as facebookStrategy } from "passport-facebook";

const router: Router = Router();

passport.serializeUser(function (user, done) {
  console.log("print user when serializer: ", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("print user on deserializer: ", user);
  done(null, user);
});

passport.use(
  new facebookStrategy(
    {
      clientID: "148412173767225",
      clientSecret: "ef334b1fafdd8426907b5ed1d1c8497d",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      done(null, profile);
    }
  )
);

router.get("/logedIn", (req: Request, res: Response) => {
  //reply with a hello word when no name param is provided
  res.send({ message: "Hello you are authenticated" });
});

router.get("/logedOut", (req: Request, res: Response) => {
  //reply with a hello word when no name param is provided
  res.send({ message: "something are wrong, you can't log in" });
});

/*router.get("/:name", (req: Request, res: Response) => {
  //Extract the name from the request parameters
  let { name } = req.params;

  //Greet the given name

  res.send({ message: `Hello ${name}` });
});
*/

router.get("/facebook", passport.authenticate("facebook"));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/logedIn",
    failureRedirect: "/auth/logedOut",
  })
);

export const WelcomeController: Router = router;
