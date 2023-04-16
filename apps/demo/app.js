const express = require("express");
const helmet = require("helmet");
const stylus = require("stylus");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
//const rateLimit = require("express-rate-limit");

const app = express();

const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

/*const limiter = rateLimit({
    windowMs: 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);*/
// app.use(helmet()); // Safari requires https, probably a bug

const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(stylus.middleware("./public"));
app.use(express.static("./public"));
app.use("/", express.static("./docs"));

app.listen(port, () => console.log(`Demo app listening on port ${port}!`));
