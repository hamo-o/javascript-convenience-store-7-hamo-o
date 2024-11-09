import UserProduct from "../src/models/UserProduct.js";
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

  test("편의점 판매 메서드(sellProduct)", () => {
    store.getStoreProducts();

    store.sellProduct(new UserProduct({
      name: "콜라", quantity: "6", price: 0, promotion: "",
    }));

    expect(store.getStoreProducts())
      .toEqual([{
        name: "콜라",
        price: 1000,
        quantity: 4,
        promotion: "탄산2+1",
      }, {
        name: "콜라",
        price: 1000,
        quantity: 10,
        promotion: "",
      }]);
  });
});
