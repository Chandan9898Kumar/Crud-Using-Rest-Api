import moduleRouter from "./routes/customer"

const express = require("express");
const app = express();

const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.raw());
app.use(cookieParser());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(
  session({
    secret: "backend-api-secrets",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000", // Origin http://localhost:3000 is given because it is where our front-end application is running.so now backend can make connection with frontend
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;






app.use('/api/v1/user',moduleRouter)





app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is Successfully Running,and App is listening on port " + PORT);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
