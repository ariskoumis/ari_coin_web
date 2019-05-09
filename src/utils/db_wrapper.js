function attemptLogin(username, password) {
    alert(username +  password)
}

function createAccount(username, password) {
    alert(username +  password)
}

let db_helper = {
    attemptLogin: attemptLogin,
    createAccount: createAccount
}

export default db_helper;