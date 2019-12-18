module.exports = (router, app, controller) {
    /* Register a new user */
    router.post("/registerUser", controller.registerUser);

    /* Allowing existing users to login */
    router.post("/login", app.oauth.grant(), controller.login);

    return router;
}
