const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");
const router = require("./routes/api/members");

const app = express();
const PORT = process.env.PORT || 5000;

//http.listen instead of app.listen so that both socket.io and express can run together by using the same node http server
//if use app.listen then only express will run and u need to create a separate http server for socket.io
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route - Server Side Rendering
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

// Set static folder - acts as web server
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes - acts as API server
app.use("/api/members", router);
