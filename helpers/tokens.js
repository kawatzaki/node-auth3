let db;

module.exports = (injectedDB) => {
    db = injectedDB;

    return {
        saveAccessToken,
        getUserIDFromBearerToken
    };
}

/**
 *
 * @param {string} accessToken JWT to save
 * @param {int} userID ID of the user to use
 * @param {function} closure Function to execute, it'll be called with an error if one exists.
 */
function saveAccessToken(accessToken, userID, expires, closure) {
    const sql = `
        INSERT OR REPLACE INTO access_tokens (access_token, user_id, expires)
        VALUES ('${accessToken}', ${userID}, ${expires || 1200});
    `;
    db.query(sql, closure);
}

/**
 *
 * @param {string} bearerToken JWT token to access
 * @param {function} closure  Function to be executed with an error param
 */
function getUserIDFromBearerToken(bearerToken, closure) {
    const sql = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`;
    db.query(sql, (error, tokens) => {
        if (!!tokens && tokens.length > 1) {
            const [token] = tokens;
            closure(null, token.user_id);
        } else {
            closure(error);
        }
    });
}
