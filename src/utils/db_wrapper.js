async function attemptLogin(username, password) {
    return await fetch(
        `/api/attemptLogin?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    )
    .then(response => { return response.json() });
}

async function createAccount(username, password) {
    return await fetch(
        `/api/createAccount?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    )
    .then(response => { return response.json() });
}

let db_helper = {
    attemptLogin: attemptLogin,
    createAccount: createAccount
}

export default db_helper;