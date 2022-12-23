import baseAPI from "$root/page/base-api";

const restfulBooker = {
    createToken     : (data) => baseAPI.post('/auth', data),
    createBooking   : (data) => baseAPI.post('/booking', data),
    getBookingByID  : (param) => baseAPI.get('/booking/' + param),
    updateBooking   : (data, param) => baseAPI.put('/booking/' + param, data)
}

export default restfulBooker;