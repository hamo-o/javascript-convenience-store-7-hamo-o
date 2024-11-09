import path from "path";
import fs from "node:fs/promises";

class File {
  #filename;

  #filePath;

  constructor(filename) {
    this.#filename = filename;
    this.#filePath = path.resolve("public", this.#filename);
  }

  async readFile(callback) {
    try {
      const data = await fs.readFile(this.#filePath, { encoding: "utf8" });
      const [header, ...body] = callback(data).split("\n").map(callback);
      return { header, body };
    } catch (error) {
      // TODO: 커스텀 에러 객체 던지기
      throw new Error();
    }
  }

  async writeFile(content) {
    try {
      await fs.writeFile(this.#filePath, content);
    } catch (error) {
      // TODO: 커스텀 에러 객체 던지기
      throw new Error();
    }
  }
}

export default File;
