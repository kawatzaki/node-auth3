let helpers = {};

module.exports = (injectedUsersHelper) => {
    helpers.users = injectedUsersHelper;

    return {
        registerUser,
        login
    };
}

/**
 * Remote method to save an user
 * @param {Express/Request} req
 * @param {Express/Response} res
 */
function registerUser(req, res) {
    const { username, password } = req.body;
    helpers.users.doesUserExist(username, (error, exists) => {
        let message;
        if (error) {
            message = error.message;
            sendResponse(res, message, error);

        } else if (exists) {
            message = "That username is already taken";
            sendResponse(res, message);

        } else {
            helpers.users.saveUser(username, password, (error) => {
                if (error) {
                    message = error.message;
                } else {
                    message = `User ${username} was registered correctly`;
                }
                sendResponse(res, message, error);
            });
        }
    });
}

/**
 * TODO: implement login
 */
function login() {

}

/**
 * Send the response back to the client
 * @param {Express/Response} res
 * @param {string} message Message to show
 * @param {object} error Potentially null if there was no errors
 */
function sendResponse(res, message, error) {
    res.status(error ? 500 : 200).json({
        message,
        error
    });
}
