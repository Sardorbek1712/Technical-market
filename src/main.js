import path from "path";
import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan";
import { mongoDB } from "./mongo/mongo.js";
import { appConfig } from "./config/app.config.js";
import { routes } from "./routes/index.js";


const app = express()


// SET VIEW ENGINE TO EJS
app.set("view engine", "ejs");

// SET EJS FILES PATH
app.set("views", path.join(process.cwd(), "src", "views"));

// SERVE STATIC FILES IN PUBLIC DIRECTORY -> MIDDLEWARE
app.use('/public',express.static(path.join(process.cwd(), "public"))); // 1


// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))

// Connecting to mongoDB database
mongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/v1",routes)


app.listen(appConfig.port , appConfig.host, () => {
    console.log('Server listening on port : ', appConfig.port);
})