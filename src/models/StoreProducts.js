import StoreProduct from "./StoreProduct.js";

class StoreProducts {
  #products;

  #productHeader;

  #productBody;

  constructor({ header, body }) {
    // TODO: split 유틸로 빼기
    this.#productHeader = header.split(",");
    this.#products = this.setStoreProducts(body);
  }

  #createProduct(item) {
    // TODO: split 유틸로 빼기
    const itemArray = item.split(",");
    return this.#productHeader.reduce((obj, key, idx) => ({ ...obj, [key]: itemArray[idx] }), {});
  }

  #findProductByName(name) {
    return this.#products.filter((product) => product.isEqualProduct(name));
  }

  setStoreProducts(body) {
    return body.map((item) => new StoreProduct(this.#createProduct(item)));
  }

  getStoreProducts() {
    return this.#products.map((product) => product.getProduct());
  }

  sellProduct(user) {
    const storeProducts = this.#findProductByName(user.getProduct().name);
    storeProducts.forEach((store) => {
      const count = user.isRemain();
      if (count) {
        const last = store.sell(count);
        user.buy(last);
      }
    });
  }
}

export default StoreProducts;
