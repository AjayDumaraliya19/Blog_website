const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config");
const { connectDB } = require("./db/dbconnection");
const routes = require("./routes");

const multer = require("multer");
const path = require("path");

const app = express();

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../images");
    cb(null, uploadPath); // change this to your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use file.originalname or any other property of the file object
  },
});

const upload = multer({ storage: store });

app.post("/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded successfully..!");
});

/* ------------ Allow data from body / Allow json data from body ------------ */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

/* --------- Allow the helps to get resources from external servers --------- */
app.use(cors());
app.use("*", cors());

/* --------------------------- Connect all routes --------------------------- */
app.use("/v1", routes);

/* ------------------------ Error Handling Middleware ----------------------- */
app.use((req, res, next) => {
  next(new Error("Route not connected!"));
});

/* ---------------------- Database connection function ---------------------- */
connectDB()
  .then(() => {
    /* --------------------- Start server and listen on port -------------------- */
    app.listen(config.port, () => {
      console.log(
        `${config.mode} server running at http://localhost:${config.port}/`
      );
    });
  })
  .catch((e) => console.log(e));
