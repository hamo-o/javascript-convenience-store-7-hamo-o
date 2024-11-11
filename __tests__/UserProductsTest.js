import path from "path";
import fs from "node:fs/promises";
import UserProducts from "../src/models/UserProducts.js";
import StoreProducts from "../src/models/StoreProducts.js";
import File from "../src/utils/File.js";

describe("StoreProducts 클래스 테스트", () => {
  let user;
  let store;
  const originalFilePath = path.resolve("public", "products.md");
  const testFilePath = path.resolve("public", "products_test.md");

  beforeAll(async () => {
    await fs.copyFile(originalFilePath, testFilePath);
  });

  afterAll(async () => {
    await fs.unlink(testFilePath);
  });

  beforeEach(() => {
    store = new StoreProducts(new File("products_test.md"));
    store.setStoreProducts({
      header: "name,price,quantity,promotion",
      body: ["콜라,1000,10,탄산2+1", "에너지바,1000,5,null"],
    });
    user = new UserProducts();
  });

  test("사용자 물품구매 메서드(buyProduct)", () => {
    const cartList = user.buyProduct("[콜라-3],[에너지바-5]", store);

    expect(cartList)
      .toEqual([{
        name: "콜라", quantity: 3, price: 1000, promotion: "탄산2+1",
      }, {
        name: "에너지바", quantity: 5, price: 1000, promotion: "null",
      }]);
  });
});
