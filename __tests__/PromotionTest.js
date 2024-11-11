import { MissionUtils } from "@woowacourse/mission-utils";
import Promotion from "../src/models/Promotion.js";

const mockNowDate = (date = null) => {
  const mockDateTimes = jest.spyOn(MissionUtils.DateTimes, "now");
  mockDateTimes.mockReturnValue(new Date(date));
  return mockDateTimes;
};

describe("Promotion 클래스 테스트", () => {
  let promotion;

  beforeEach(() => {
    promotion = new Promotion(
      {
        name: "탄산2+1",
        buy: "2",
        get: "1",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("isInDateRange 메서드 테스트", () => {
    describe("오늘 날짜가 프로모션 기간 내에 포함된 경우", () => {
      test("할인을 적용", () => {
        mockNowDate("2024-01-01");
        expect(promotion.isInDateRange()).toBe(true);
      });
    });

    describe("오늘 날짜가 프로모션 기간 내에 포함되지 않은 경우", () => {
      test("할인을 적용하지 않음", () => {
        mockNowDate("2023-12-31");
        expect(promotion.isInDateRange()).toBe(false);
      });
    });
  });
});
