module.exports = (router, app, controller) => {
    router.post("/enter", app.oauth.authorize(), controller.accessRetrictedArea());

    return router;
}