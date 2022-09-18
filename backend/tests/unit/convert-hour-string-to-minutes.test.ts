import { convertHourStringToMinutes } from "../../src/utils/convert-hour-string-to-minutes";

describe("convertHourStringToMinutes tests", () => {
  it("should return minutes equivalent to the hour string", () => {
    expect(convertHourStringToMinutes("20:00")).toBe(1200);
  });

  it("should return an error if the param is incorrectly formatted", () => {
    expect(convertHourStringToMinutes("1200")).toBe(NaN);
  });
});
