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

async function loggedIn(username) {
    return await fetch(
        `/api/userIsLoggedIn`
    )
    
    .then(response => { return response.json() });
}

async function getMarketData() {
    return await fetch(
        '/api/getMarketData'
    )

    .then(response => { return response.json() })
}

async function logout() {
    return await fetch (
        '/api/logout'
    )
    .then(response => { return response.json() });
}

async function currentUserIsAdmin() {
    return await fetch (
        '/api/currentUserIsAdmin'
    )
    .then(response => { return response.json() });
}

async function getMarketValue() {
    return await fetch (
        '/api/getMarketValue'
    )
    .then(response => { return response.json()});
}

async function getMiningCap() {
    return await fetch (
        '/api/getMiningCap'
    )
    .then(response => { return response.json()});
}

async function updateCoinData(market_value, mining_cap) {
    return await fetch (
        `/api/updateCoinData?market_value=${encodeURIComponent(market_value)}&mining_cap=${encodeURIComponent(mining_cap)}`
    )
    .then(response => { return response.json() });
}

let db_helper = {
    attemptLogin: attemptLogin,
    createAccount: createAccount,
    loggedIn: loggedIn,
    logout: logout,
    currentUserIsAdmin: currentUserIsAdmin,
    getMarketValue: getMarketValue,
    getMiningCap: getMiningCap,
    updateCoinData: updateCoinData
};

export default db_helper;