import restfulBooker from "$root/page/restful-booker";
import * as data from "$root/data/restful-data";
import { assert } from "chai";

describe("RESTFUL BOOKER END TO END", () => {
  var token;
  var bookingId;
  var firstName;

  // Ping Check
  it("Ensure PING CHECK API is running", async () => {
    const responsePingCheck = await restfulBooker.pingCheck();
    assert.equal(responsePingCheck.status, 201);
    assert.equal(responsePingCheck.data, "Created");
  });
  /*
        Create Token
    */ 5;
  it("Ensure CREATE TOKEN API is successfully working", async () => {
    const responseCreateToken = await restfulBooker.createToken(
      data.VALID_CREATE_TOKEN
    );

    assert.equal(responseCreateToken.status, 200);
    assert.containsAllKeys(responseCreateToken.data, ["token"]);
    //store token into token variable
    console.log(responseCreateToken.data.token);
    token = responseCreateToken.data.token;
  });

    it("Ensure CREATE TOKEN API without username is failed", async () => {
        const responseCreateToken = await restfulBooker.createToken(data.INVALID_CREATE_TOKEN_WITHOUT_USERNAME);

    assert.equal(responseCreateToken.status, 200);
    assert.containsAllKeys(responseCreateToken.data, ["reason"]);
    assert.equal(
      responseCreateToken.data.reason,
      data.ERROR_INVALID_CREATE_TOKEN.reason
    );
  });

    it("Ensure CREATE TOKEN API without username is failed", async () => {
        const responseCreateToken = await restfulBooker.createToken(data.INVALID_CREATE_TOKEN_WITHOUT_PASSWORD);

    assert.equal(responseCreateToken.status, 200);
    assert.containsAllKeys(responseCreateToken.data, ["reason"]);
    assert.equal(
      responseCreateToken.data.reason,
      data.ERROR_INVALID_CREATE_TOKEN.reason
    );
  });

  /*
        Create Booking
    */
  it("Ensure CREATE BOOKING API is successfully working", async () => {
    const responseCreateBooking = await restfulBooker.createBooking(
      data.CREATE_BOOKING
    );

    assert.equal(responseCreateBooking.status, 200);
    assert.containsAllKeys(responseCreateBooking.data, ["bookingid"]);
    assert.containsAllKeys(responseCreateBooking.data.booking, ["firstname"]);
    //store bookingid into bookingId variable
    console.log(responseCreateBooking.data.bookingid);
    bookingId = responseCreateBooking.data.bookingid;
  });

  /*
        Get Booking
  */
  it("Ensure GET BOOKING BY ID API is successfully working", async () => {
    const param = bookingId;
    const responseGetBookingById = await restfulBooker.getBookingByID(param);
    assert.equal(responseGetBookingById.status, 200);
    console.log(responseGetBookingById.data.firstname);
    firstName = responseGetBookingById.data.firstname;
  });

  //Get Booking by First Name

  it("Ensure GET BOOKING BY FIRST NAME API is successfully working", async () => {
    const responseGetBookingByFirstName =
      await restfulBooker.getBookingByFirstName(firstName);
    assert.equal(responseGetBookingByFirstName.status, 200);
    console.log(responseGetBookingByFirstName.data[0].bookingid);
    assert.isArray(responseGetBookingByFirstName.data);
    assert.equal((await restfulBooker.getBookingByID(responseGetBookingByFirstName.data[0].bookingid)).data.firstname,firstName);
  });
    
  /*
        Update Booking
    */
  it("Ensure UPDATE BOOKING API is working", async () => {
    const responseUpdateBooking = await restfulBooker.updateBooking(
      bookingId,
      data.UPDATE_BOOKING
    );
    assert.equal(responseUpdateBooking.status, 200);
    assert.equal(
      responseUpdateBooking.data.firstname,
      data.UPDATE_BOOKING.firstname
    );
    console.log(responseUpdateBooking.data.firstname);
    assert.containsAllKeys(responseUpdateBooking.data, [
      "firstname",
      "lastname",
      "totalprice",
      "depositpaid",
      "bookingdates",
      "additionalneeds",
    ]);
  });

  // Update booking without token

  it("Ensure UPDATE BOOKING API without token failed", async () => {
    const responseUpdateBooking = await restfulBooker.updateBookingwithouttoken(
      bookingId,
      data.UPDATE_BOOKING
    );
    assert.equal(responseUpdateBooking.status, 403);
    assert.equal(responseUpdateBooking.data, "Forbidden");
  });

  // Delete Booking

  it("Ensure DELETE BOOKING API is working", async () => {
    const responseDeleteBooking = await restfulBooker.deleteBooking(bookingId);
    assert.equal(responseDeleteBooking.status, 201);
    assert.equal(responseDeleteBooking.data, "Created");
  });

  //Update Booking with unregistered booking id
  //Booking id was deleted by the test before
  it("Ensure UPDATE BOOKING API with unregistered booking id failed", async () => {
    const responseUpdateBooking = await restfulBooker.updateBooking(
      bookingId,
      data.UPDATE_BOOKING
    );
    assert.equal(responseUpdateBooking.status, 405);
  });
});
