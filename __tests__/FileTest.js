import File from "../src/utils/File.js";

describe("File 클래스 테스트", () => {
  let file;
  beforeEach(() => {
    file = new File("products.md");
  });

  test("readFile 메서드", async () => {
    const result = await file.readFile();
    expect(result).toHaveProperty("header", "name,price,quantity,promotion");
    expect(result).toHaveProperty("body");
  });
});
