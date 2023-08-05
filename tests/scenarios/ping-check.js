import restfulBooker from "$root/page/restful-booker";
import { assert } from "chai";

describe("Ping Check API", () => {
    it("Verify successful response for Ping Check API", async () => {
      const responsePingCheck = await restfulBooker.pingCheck();
      assert.equal(responsePingCheck.status, 201);
      assert.equal(responsePingCheck.data, "Created");
    });
  });