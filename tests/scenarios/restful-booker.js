import restfulBooker from "$root/page/restful-booker";
import * as data from '$root/data/restful-data';
import { assert } from "chai";

describe("RESTFUL BOOKER END TO END", () => {

    var token;
    it("Ensure CREATE TOKEN API is successfully working", async () => {
        const responseCreateToken = await restfulBooker.createToken(data.VALID_CREATE_TOKEN);

        assert.equal(responseCreateToken.status, 200);
        assert.containsAllKeys(responseCreateToken.data, ["token"]);
        //store token into token variable
        token = responseCreateToken.data.token
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


})