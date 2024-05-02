import moduleRouter from "./routes/customer.js";
import productRouter from "./routes/products.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";

const app = express();

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

app.use("/api/v1/user", moduleRouter);

app.use("/api/v1/item", productRouter);

app.use(errorHandler); // This Should be at last.

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is Successfully Running,and App is listening on port " + PORT);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
