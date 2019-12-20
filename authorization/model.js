let helpers = {};

module.exports = (injectedUsersHelper, injectedTokensHelper) => {
    helpers.users = injectedUsersHelper;
    helpers.tokens = injectedTokensHelper;

    return {
        getClient,
        saveToken,
        getUser,
        grantTypeAllowed,
        getAccessToken,
        saveAuthorizationCode
    };
};

/**
 * Return a null, always empty client
 * @todo add a client table, redirect uris and all that
 * @param {string} clientID ignored client
 * @param {string} clientSecret ignored secret
 * @param {function} closure executed after success
 */
function getClient(clientID, clientSecret, closure) {
    const client = {
        clientID,
        clientSecret,
        grants: [
            "password"
        ],
        redirectUris: null
    }

    closure(null, client);
}

/**
 * Check wether a type can be granted to a client
 * @param {string} clientID ignored client
 * @param {string} grantType ignored secret
 * @param {function} closure executed on success
 */
function grantTypeAllowed(clientID, grantType, closure) {
    closure(null, true);
}

/**
 * Interface to the helper function
 * @param {string} username User name
 * @param {string} password Password, to be SHA-3 512
 * @param {string} closure Executed on success
 */
function getUser(username, password, closure) {
    helpers.users.getUserFromCredentials(username, password, closure);
}

/**
 * Interface to the save token function
 * @param {string} token generated JWT
 * @param {int} clientID ignored client id
 * @param {int} user user id
 * @param {function} closure executed on success
 */
function saveToken(token, clientID, userID, closure) {
    helpers.tokens.saveAccessToken(token, clientID, userID || 1200, closure);
}

/**
 * Interface to the Get User ID From Bearer Token function
 * @param {string} bearerToken JWT token
 * @param {function} closure Executed on success
 */
function getAccessToken(bearerToken, closure) {
    helpers.tokens.getUserIDFromBearerToken(bearerToken, (error, userID) => {
        if (error) {
            closure(error);
        } else {
            closure(null, {
                user: { id: userID },
                expires: null
            });
        }
    });
}

/* Dummy functions */
function saveAuthorizationCode(authorizationCode, closure) {
    // Do stuff
}
