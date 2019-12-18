const { SHA3 } = require('sha3');

const hash = SHA3(512);
let db;

module.exports = (injectedDB) => {
    db = injectedDB;

    return {
        saveUser,
        getUserFromCredentials,
        doesUserExist
    };
}

/**
 * Save an user
 * @param {string} username
 * @param {string} password
 * @param {function} closure
 */
function saveUser(username, password, closure) {
    hash.update(password);
    const sql = `
        INSERT INTO users (username, user_password)
        VALUES ('${username}', '${hash.digest()}');
    `;

    db.query(sql, closure);
}

/**
 * Find a given user by it's username and password
 * @param {string} username
 * @param {string} password
 * @param {function} closure
 */
function getUserFromCredentials(username, password, closure) {
    hash.update(password);
    const sql = `
        SELECT * FROM users WHERE username = '${username}'
        AND user_password = '${hash.digest()}';
    `;

    db.query(sql, (error, users) => {
        if (!!users && users.length > 0) {
            const [user] = users;
            closure(error, user);
        }
    });
}

/**
 * Determine wether or not an user exists
 * @param {string} username
 * @param {function} closure
 */
function doesUserExist(username, closure) {
    const sql = `SELECT * FROM users WHERE username = '${username}';`;

    db.query(sql, (error, rows) => {
        const exists = !!rows && rows.length > 0;
        closure(error, exists);
    });
}




