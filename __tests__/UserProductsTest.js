import UserProducts from "../src/models/UserProducts.js";

describe("StoreProducts 클래스 테스트", () => {
  let user;
  beforeEach(() => {
    user = new UserProducts();
  });

  test("사용자 물품구매 메서드(buyProduct)", () => {
    expect(user.buyProduct("[콜라-3],[에너지바-5]"))
      .toEqual([{
        name: "콜라", quantity: 3, price: 0, promotion: "",
      }, {
        name: "에너지바", quantity: 5, price: 0, promotion: "",
      }]);
  });
});
