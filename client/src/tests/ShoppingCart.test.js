import React from "react";
import { render } from "@testing-library/react";
import { getNodeText } from "@testing-library/react";
import ShoppingCart from "../components/ShoppingCart";

describe("ShoppingCart", () => {
  describe("single item in cart", () => {
    const product = {
      _id: 1,
      title: "Fancy Gentlemans Jacket",
      quantity: 1,
      price: 150,
    };

    it("renders 1 `CartItem` per item in cart", () => {
      const { getAllByTestId } = render(<ShoppingCart cart={[product]} />);
      expect(getAllByTestId("cartItem").length).toBe(1);
    });

    it("has correct total", () => {
      let component = render(<ShoppingCart cart={[product]} />);
      let total = component.container.querySelector(".total");
      expect(getNodeText(total)).toEqual("Total: $" + product.price.toFixed(2));
    });

    describe("then adds another item to cart", () => {
      const product2 = {
        _id: 2,
        title: "Fancy Gentlemans Hat",
        quantity: 1,
        price: 95.0,
      };

      it("renders 1 `CartItem` per item in cart", () => {
        const { getAllByTestId } = render(
          <ShoppingCart cart={[product, product2]} />
        );
        expect(getAllByTestId("cartItem").length).toBe(2);
      });

      it("has correct total", () => {
        let component = render(<ShoppingCart cart={[product, product2]} />);
        let total = component.container.querySelector(".total");
        expect(getNodeText(total)).toEqual(
          "Total: $" + (product.price + product2.price).toFixed(2)
        );
      });
    });
  });
});
