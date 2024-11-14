import Store from "../src/models/Store.js";
import MembershipDiscount from "../src/models/MembershipDiscount.js";

describe("상점 클래스 테스트", () => {
  let store;

  beforeEach(() => {
    store = new Store(new MembershipDiscount());
    [
      {
        name: "콜라", price: 1000, quantity: 8, promotion: "",
      },
      {
        name: "사이다", price: 1000, quantity: 2, promotion: "",
      },
    ].forEach((item) => store.addToDefaultCartList(item));
  });

  test("총구매액은 상품별 가격과 수량을 곱하여 계산한다.", () => {
    expect(store.calcTotalPrice()).toBe(10000);
  });

  test("멤버십 할인 적용", () => {
    store.checkMembership();
    expect(store.membershipDiscount()).toBe(3000);
  });

  test("금액 정보 반환", () => {
    store.checkMembership();
    store.membershipDiscount();

    expect(store.getPriceInfo()).toEqual({
      totalPrice: "10,000",
      promotionDiscount: "0",
      membershipDiscount: "3,000",
      finalPrice: "7,000",
      finalCount: 10,
    });
  });
});
