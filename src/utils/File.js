import path from "path";
import fs from "node:fs/promises";

class File {
  #filename;

  #filePath;

  #header;

  constructor(filename) {
    this.#filename = filename;
    this.#filePath = path.resolve("public", this.#filename);
    this.#header = "";
  }

  async readFile(callback) {
    try {
      const data = await fs.readFile(this.#filePath, { encoding: "utf8" });
      const [header, ...body] = callback(data).split("\n").map(callback);
      this.#header = header;
      return { header, body };
    } catch (error) {
      throw new Error();
    }
  }

  async writeFile(content) {
    try {
      await fs.writeFile(this.#filePath, `${this.#header}\n${content}`);
    } catch (error) {
      throw new Error();
    }
  }
}

export default File;
