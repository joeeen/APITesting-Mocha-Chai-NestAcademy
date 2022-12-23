import restfulBooker from "$root/page/restful-booker";
import * as data from '$root/data/restful-data';
import { assert } from "chai";

describe("RESTFUL BOOKER END TO END", () => {

    var token;
    var bookingId;
    /*
        Create Token
    */
    it("Ensure CREATE TOKEN API is successfully working", async () => {
        const responseCreateToken = await restfulBooker.createToken(data.VALID_CREATE_TOKEN);

        assert.equal(responseCreateToken.status, 200);
        assert.containsAllKeys(responseCreateToken.data, ["token"]);
        //store token into token variable
        console.log(responseCreateToken.data.token);
        token = responseCreateToken.data.token;
    })

    it("Ensure CREATE TOKEN API whitout username is failed", async () => {
        const responseCreateToken = await restfulBooker.createToken(data.INVALID_CREATE_TOKEN_WITHOUT_USERNAME);

        assert.equal(responseCreateToken.status, 200);
        assert.containsAllKeys(responseCreateToken.data, ["reason"]);
        assert.equal(responseCreateToken.data.reason, data.ERROR_INVALID_CREATE_TOKEN.reason);
    })

    it("Ensure CREATE TOKEN API whitout username is failed", async () => {
        const responseCreateToken = await restfulBooker.createToken(data.INVALID_CREATE_TOKEN_WITHOUT_PASSWORD);

        assert.equal(responseCreateToken.status, 200);
        assert.containsAllKeys(responseCreateToken.data, ["reason"]);
        assert.equal(responseCreateToken.data.reason, data.ERROR_INVALID_CREATE_TOKEN.reason);
    })

    /*
        Create Booking
    */
   it("Ensure CREATE BOOKING API is successfully working", async () => {
        const responseCreateBooking = await restfulBooker.createBooking(data.CREATE_BOOKING);

        assert.equal(responseCreateBooking.status, 200);
        assert.containsAllKeys(responseCreateBooking.data, ["bookingid"]);
        assert.containsAllKeys(responseCreateBooking.data.booking, ["firstname"]);
        //store bookingid into bookingId variable
        console.log(responseCreateBooking.data.bookingid)       
        bookingId = responseCreateBooking.data.bookingid;
   })

    /*
        Get Booking
    */
    it("Ensure GET BOOKING BY ID API is successfully working", async () => {
        const param = bookingId;
        const responseGetBookingById = await restfulBooker.getBookingByID(param);

        assert.equal(responseGetBookingById.status, 200);
        console.log(responseGetBookingById.data.firstname);
    })

    /*
        Update Booking
    */
   it("Ensure UPDATE BOOKING API is working", async () => {
        
   })

})