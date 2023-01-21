const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");
const router = require("./routes/api/members");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const app = express();
const PORT = process.env.PORT || 4000;

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
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members,
  });
});

app.get("/*.js", (req, res) => {
  /**
   *  req.protocol   // "https"
      req.hostname     // "example.com"
      req.path // "/creatures"
      req.originalUrl  "/creatures?filter=sharks"
      req.method //GET
      req.header('Content-Type')  // "application/json"
      req.header('user-agent')    // "Mozilla/5.0 (Macintosh Intel Mac OS X 10_8_5) AppleWebKi..."
      req.header('Authorization')
      req.cookies.sessionDate 
   */
  console.log(req.hostname); //req object can't be stringfied due to circular references
  res.send(req.path.slice(1));
});

// GET https://example.com/user/1
app.get("/user/:userid", (req, res) => {
  console.log(req.params.userid); // "1"
});

// GET https://example.com/search?keyword=great-white
app.get("/search", (req, res) => {
  console.log(req.query.keyword); // "great-white"
});

// POST https://example.com/login
//
//      {
//        "email": "user@example.com",
//        "password": "helloworld"
//      }
app.post("/login", (req, res) => {
  console.log(req.body.email); // "user@example.com"
  console.log(req.body.password); // "helloworld"
});

// Set static folder - acts as web server
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes - acts as REST API server
app.use("/api/members", router);

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: (root, args, context, info) => {
          return "Graphql is success";
        },
      },
    },
  }),
});

//You need to make a POST request from browser and put the query inside body to get the response
//graphqlHTTP  method does 4 things:
/**
 * 1)parse the query string we get from POST call body
 * 2)validate it against schema
 * 3)execute the resolvers of all fields
 * 4)construct the response object and send it to client
 */
//acts as GraphQL server
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
