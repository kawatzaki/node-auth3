module.exports = (router, app, controller) => {
    router.post("/enter", app.oauth2.authorize, controller.accessRestrictedArea);

    return router;
}