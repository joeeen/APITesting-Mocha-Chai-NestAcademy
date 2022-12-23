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

export const CREATE_BOOKING = {
    "firstname" : "Joanna",
    "lastname" : "",
    "totalprice" : 455,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
        },
    "additionalneeds" : "Breakfast"
}

export const UPDATE_BOOKING = {
    "firstname" : "Herdian",
    "lastname" : "Chandra",
    "totalprice" : 766,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
        },
    "additionalneeds" : "Lunch"
}