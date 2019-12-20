module.exports = (router, app, controller) => {
    /* Allowing existing users to login */
    router.post("/login", app.oauth2.token());

    /* Register a new user */
    router.post("/registerUser", controller.registerUser);

    return router;
}
