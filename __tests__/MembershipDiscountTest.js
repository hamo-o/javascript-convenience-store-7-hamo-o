import MembershipDiscount from "../src/models/MembershipDiscount.js";

describe("멤버십 할인 클래스 테스트", () => {
  let membership;

  beforeEach(() => {
    membership = new MembershipDiscount();
  });

  test("멤버십 할인 한도보다 적을 경우 30% 할인 적용", () => {
    const price = membership.getDiscountPrice(10000);
    expect(price).toBe(3000);
  });

  test("멤버십 할인 한도보다 클 경우 할인 한도만 적용", () => {
    const price = membership.getDiscountPrice(30000);
    expect(price).toBe(8000);
  });

  test("멤버십 할인 금액이 1000원 단위가 아닐 경우 내림 적용", () => {
    const price = membership.getDiscountPrice(12000);
    expect(price).toBe(3000);
  });

  test("멤버십 할인 금액이 1000원 미만일 경우 할인 미적용", () => {
    const price = membership.getDiscountPrice(1800);
    expect(price).toBe(0);
  });
});
