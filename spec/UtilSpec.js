describe("Util", () => {
  const Util = require("../src/Util");

  describe("returns date in correct format", () => {
    it("", () => {
      date = new Date(2022, 9, 23);
      expect(Util.convertDateToUKFormat(date)).toBe("23/10/2022"); // January is 0!
    });
  });
});
