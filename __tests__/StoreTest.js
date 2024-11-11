import Store from "../src/models/Store.js";
import MembershipDiscount from "../src/models/MembershipDiscount.js";

describe("상점 클래스 테스트", () => {
  let store;

  beforeEach(() => {
    store = new Store(new MembershipDiscount());
  });

  test("멤버십 할인 적용", () => {
    store.setTotalPrice(10000);
    expect(store.membershipDiscount()).toBe(3000);
  });
});
