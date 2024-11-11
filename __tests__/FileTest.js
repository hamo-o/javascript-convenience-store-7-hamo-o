import path from "path";
import fs from "node:fs/promises";
import File from "../src/utils/File.js";

describe("File 클래스 테스트", () => {
  let file;
  const originalFilePath = path.resolve("public", "products.md");
  const testFilePath = path.resolve("public", "products_test.md");

  beforeAll(async () => {
    await fs.copyFile(originalFilePath, testFilePath);
  });

  beforeEach(() => {
    file = new File("products_test.md");
  });

  afterAll(async () => {
    await fs.unlink(testFilePath);
  });

  test.skip("readFile 메서드", async () => {
    const result = await file.readFile((input) => input.trim());
    expect(result).toHaveProperty("header", "name,price,quantity,promotion");
    expect(result).toHaveProperty("body");
  });

  test.skip("writeFile 메서드", async () => {
    await file.writeFile("name,price,quantity,promotion\n햄,2500,10,null");

    const result = await file.readFile((input) => input.trim());
    expect(result.header).toBe("name,price,quantity,promotion");
    expect(result.body).toEqual(["햄,2500,10,null"]);
  });
});
