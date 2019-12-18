/* Vendor libraries  */
const parser = require("body-parser");
const oauth2 = require("oauth2-server");
const express = require("express");

/* User libraries */
const db = require("./helpers/db");

/* Save and retrieve database objects, like tokens and users */
const helpers = {
    tokens: require("./helpers/tokens")(db),
    users: require("./helpers/users")(db)
};

/* Inject the helpers into the model (aggh...) */
const model = require("./authorization/model")(helpers.users, helpers.tokens);

/* Set-Up Express */
const port = 8080;
const app = express();

/* Set-Up OAuth2 into the Express app */
app.oauth2 = oauth2({
    model,
    grants: ["password"],
    debug: true
});

/* Routers and controllers
   This is the restricted area */
const restricted = { controller: require("./controllers/restricted") };
restricted.routes = require("./http/restricted")(
    express.Router(),
    app,
    restricted.controller
);
const auth = { controller: require("./controllers/auth") };
auth.routes = require("./http/auth")(
    express.Router(),
    app,
    auth.controller
);

/* Register middleware */
app.use(parser.urlencoded({ extended: true }));
app.use(app.oauth2.errorHandler());
app.use("/auth", auth.routes);
app.use("/restricted", restricted.routes);

/* Start the server */
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

