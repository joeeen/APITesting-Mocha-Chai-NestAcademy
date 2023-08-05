import restfulBooker from "$root/page/restful-booker";
import * as data from "$root/data/restful-data";
import { assert } from "chai";

describe("Authorization API", () => {
  var token;

  it("Verify successful response for Create Token API", async () => {
      const response = await restfulBooker.createToken(data.VALID_CREATE_TOKEN);
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.data, ["token"]);
      console.log(response.data.token);
      //store token value
      token = response.data.token;
  });

  it("Verify error response for Create Token API without username", async () => {
      const response = await restfulBooker.createToken(data.INVALID_CREATE_TOKEN_WITHOUT_USERNAME);
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.data, ["reason"]);
      assert.equal(response.data.reason,data.ERROR_INVALID_CREATE_TOKEN.reason);
  });

  it("Verify error response for Create Token API without password", async () => {
      const response = await restfulBooker.createToken(data.INVALID_CREATE_TOKEN_WITHOUT_PASSWORD);
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.data, ["reason"]);
      assert.equal(response.data.reason,data.ERROR_INVALID_CREATE_TOKEN.reason);
  });
});