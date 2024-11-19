let users = [
    {"username": "th", "password": "sala", 'token': '', 
        "rateLimiting": {"window": 0, "requestCounter": 0}},
    {"username": "js", "password": "pass", 'token': '',
        "rateLimiting": {"window": 0, "requestCounter": 0}},
];

let data = [
    { "id": "1", "Firstname": "Tero", "Surname": "Halonen" },
    { "id": "2", "Firstname": "Jan", "Surname": "Šušteršič"}
];

const getUsers = () => {
    return users;
}

const getData = () => {
    return data;
}

export {
    getUsers, getData
};