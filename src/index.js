import express from "express";
import loginRouter from "./routes/login.js";
import 'dotenv/config';
import * as Sentry from '@sentry/node';
import log from "./middleware/logMiddleware.js";
import amenitiesRouters from "./routes/amenities.js";
import bookingsRouters from "./routes/bookings.js";
import hostsRouters from "./routes/hosts.js";
import propertiesRouters from "./routes/properties.js";
import reviewsRouters from "./routes/reviews.js";
import usersRouters from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Tracing
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

const app = express();

// Sentry middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.get("/", (req, res) => {
  res.send("Hello Winc Academy!");
});

// Bodyparser - express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resource routes
app.use(log);
app.use("/login", loginRouter);
app.use("/users", usersRouters);
app.use("/amenities", amenitiesRouters);
app.use("/bookings", bookingsRouters);
app.use("/hosts", hostsRouters);
app.use("/properties", propertiesRouters);
app.use("/reviews", reviewsRouters);


// Debug Sentry
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});