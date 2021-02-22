import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import { WelcomeController } from "./welcome.controller";

// Create a new express application instance
const app: express.Application = express();

// support application/json type post data

app.use(bodyParser.json());

// Support application/x-www-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

// Add passport middleware
app.use(passport.initialize());

// Mount the WelcomeController at the /welcome route
app.use("/auth", WelcomeController);

// The port the express app will liste on
const port = process.env.PORT || 3000;

// Serve the application at the given port
app.listen(port, () => {
  // Succes callback
  console.log(`Listening at http://localhost:${port}/`);
});
