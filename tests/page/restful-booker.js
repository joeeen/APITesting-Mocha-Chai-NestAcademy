import baseAPI from "$root/page/base-api";
import authorizeBaseAPI from "$root/page/authorize-base-api";

const restfulBooker = {
  createToken           : (data) => baseAPI.post("/auth", data),
  createBooking         : (data) => baseAPI.post("/booking", data),
  getBookingByID        : (param) => baseAPI.get("/booking/" + param),
  getBookingByFirstName : (firstName) => baseAPI.get("/booking/?firstname=" + firstName),
  pingCheck             : () => baseAPI.get("/ping"),
  updateBooking         : async (param, data) => (await authorizeBaseAPI()).put("/booking/" + param, data),
  updateBookingwithouttoken : (param, data) => baseAPI.put("/booking/" + param, data),
  deleteBooking         : async (param) => (await authorizeBaseAPI()).delete("/booking/" + param),
};

export default restfulBooker;