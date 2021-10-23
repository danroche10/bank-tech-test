const convertDateToUKFormat = require("../src/Util");

describe("util", () => {
  describe("returns date in correct format", () => {
    it("", () => {
      date = new Date(2022, 9, 23);
      expect(convertDateToUKFormat(date)).toBe("23/10/2022"); // January is 0!
    });
  });
});
