import restfulBooker from "$root/page/restful-booker";
import * as data from "$root/data/restful-data";
import { assert } from "chai";

describe("Booking API", () => {
    var bookingId;
    var firstName;
  
    it("Verify successful response for Create Booking API", async () => {
      const response = await restfulBooker.createBooking(data.CREATE_BOOKING);
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.data, ["bookingid"]);
      assert.containsAllKeys(response.data.booking, ["firstname"]);
      console.log(response.data.bookingid);
      //store bookingId value
      bookingId = response.data.bookingid;
    });
  
    it("Verify successful response for Get Booking by Id API", async () => {
      const response = await restfulBooker.getBookingByID(bookingId);
      assert.equal(response.status, 200);
      console.log(response.data.firstname);
      //store firstName value
      firstName = response.data.firstname;
    });
  
    it("Verify successful response for Get Booking by First Name API", async () => {
      const response = await restfulBooker.getBookingByFirstName(firstName);
      assert.equal(response.status, 200);
      console.log(response.data[0].bookingid);
      assert.isArray(response.data);
      assert.equal((await restfulBooker.getBookingByID(response.data[0].bookingid)).data.firstname,firstName);
    });
      
    it("Verify successful response for Update Booking API", async () => {
      const response = await restfulBooker.updateBooking(bookingId,data.UPDATE_BOOKING);
      assert.equal(response.status, 200);
      assert.equal(response.data.firstname,data.UPDATE_BOOKING.firstname);
      console.log(response.data.firstname);
      assert.containsAllKeys(response.data, [
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates",
        "additionalneeds",
      ]);
    });
  
    it("Verify error response for Update Booking API without token", async () => {
      const response = await restfulBooker.updateBookingWithoutToken(bookingId,data.UPDATE_BOOKING);
      assert.equal(response.status, 403);
      assert.equal(response.data, "Forbidden");
    });
  
    it("Verify successful response for Delete Booking API", async () => {
      const response = await restfulBooker.deleteBooking(bookingId);
      assert.equal(response.status, 201);
      assert.equal(response.data, "Created");
    });
  
    // Booking id was deleted by the test before, so updating will result in an error  
    it("Verify error response for Update Booking API with unregistered booking id", async () => {
      const response = await restfulBooker.updateBooking(bookingId,data.UPDATE_BOOKING);
      assert.equal(response.status, 405);
    });
  });