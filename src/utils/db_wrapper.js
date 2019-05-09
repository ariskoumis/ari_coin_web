function attemptLogin(username, password) {
    fetch(`/api/attemptLogin?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
    .then(response => response.json())
    .then(state => console.log(state));
}

function createAccount(username, password) {
    fetch(`/api/attemptLogin?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
    .then(response => response.json())
    .then(state => console.log(state));
}

let db_helper = {
    attemptLogin: attemptLogin,
    createAccount: createAccount
}

export default db_helper;