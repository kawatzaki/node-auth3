module.exports = {
    accessRestrictedArea
}

/**
 * This area of the application is meant to be protected
 * @param {Express/Request} req
 * @param {Express/Response} res
 */
function accessRestrictedArea(req, res) {
    res.send("You've got access to this area. Be careful");
}
