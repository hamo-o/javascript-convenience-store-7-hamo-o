import Product from "./Product.js";

class StoreProducts {
  #products;

  #productHeader;

  #productBody;

  constructor({ header, body }) {
    this.#products = [];
    // TODO: split 유틸로 빼기
    this.#productHeader = header.split(",");
    this.#productBody = body;
  }

  #createProduct(item) {
    // TODO: split 유틸로 빼기
    const itemArray = item.split(",");
    return this.#productHeader.reduce((obj, key, idx) => ({ ...obj, [key]: itemArray[idx] }), {});
  }

  getStoreProducts() {
    this.#products = this.#productBody.map((item) => {
      const product = new Product(this.#createProduct(item));
      return product.getProduct();
    });
    return this.#products;
  }
}

export default StoreProducts;
