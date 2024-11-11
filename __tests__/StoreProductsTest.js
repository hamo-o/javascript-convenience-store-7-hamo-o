import path from "path";
import fs from "node:fs/promises";
import UserProduct from "../src/models/UserProduct.js";
import StoreProducts from "../src/models/StoreProducts.js";
import File from "../src/utils/File.js";

describe("StoreProducts 클래스 테스트", () => {
  let store;
  let file;
  const originalFilePath = path.resolve("public", "products.md");
  const testFilePath = path.resolve("public", "products_test.md");

  beforeAll(async () => {
    await fs.copyFile(originalFilePath, testFilePath);
  });

  afterAll(async () => {
    await fs.unlink(testFilePath);
  });

  beforeEach(() => {
    file = new File("products_test.md");
    store = new StoreProducts(file);
    store.setStoreProducts({
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

  test("편의점 판매 및 재고 갱신 메서드(sellProducts)", async () => {
    store.sellProducts([
      new UserProduct({
        name: "콜라", quantity: "4", price: 0, promotion: "",
      }),
      new UserProduct({
        name: "콜라", quantity: "6", price: 0, promotion: "",
      })]);

    const result = await file.readFile((input) => input.trim());
    expect(result.header).toEqual("name,price,quantity,promotion");
    expect(result.body).toEqual(["콜라,1000,0,탄산2+1", "콜라,1000,10,null"]);
  });
});
