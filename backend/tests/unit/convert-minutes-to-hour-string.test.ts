import { convertMinutesToHourString } from "../../src/utils/convert-minutes-to-hour-string";

describe("convertMinutesToHourString tests", () => {
  it("should return hour string equivalent to the minutes", () => {
    expect(convertMinutesToHourString(1200)).toBe("20:00");
  });
});
