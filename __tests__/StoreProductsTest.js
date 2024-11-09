import StoreProducts from "../src/models/StoreProducts.js";

describe("StoreProducts 클래스 테스트", () => {
  let store;
  beforeEach(() => {
    store = new StoreProducts({
      header: "name,price,quantity,promotion",
      body: ["콜라,1000,10,탄산2+1", "콜라,1000,10,null"],
    });
  });

  test("편의점 재고확인 메서드(getStoreProducts)", () => {
    expect(store.getStoreProducts())
      .toEqual([{
        name: "콜라",
        price: 1000,
        quantity: 10,
        promotion: "탄산2+1",
      }, {
        name: "콜라",
        price: 1000,
        quantity: 10,
        promotion: "",
      }]);
  });
});
