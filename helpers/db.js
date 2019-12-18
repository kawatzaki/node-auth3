const sqlite = require("sqlite3");

/* Only the query method is exported */
module.exports = {
    query
};

let db = null;

/**
 * TODO: make environment aware database selection
 */
function initConnection() {
    db = new sqlite.Database("./db/dev.db", (error) => {
        if (error) {
            console.error(error.message);
        }
    });
}

/**
 *
 * @param {String} string  Query String to execute
 * @param {Function} closure  Callback to execute on success
 */
function query(sql, closure) {
    initConnection();

    db.all(sql, [], (error, rows) => {
        console.log(`
            SQLite: ${sql}
            error: ${error}
            results: ${rows}
        `);

        closure(error, rows);
    });

    db.close();
}

