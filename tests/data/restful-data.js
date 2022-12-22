export const VALID_CREATE_TOKEN = {
    "username" : "admin",
    "password" : "password123"
}

export const INVALID_CREATE_TOKEN_WITHOUT_USERNAME = {
    "username" : "",
    "password" : "password123"
}

export const INVALID_CREATE_TOKEN_WITHOUT_PASSWORD = {
    "username" : "admin",
    "password" : ""
}

export const ERROR_INVALID_CREATE_TOKEN = {
    "reason": "Bad credentials"
}