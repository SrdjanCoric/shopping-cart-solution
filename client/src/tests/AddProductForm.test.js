import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { within, getNodeText, prettyDOM } from "@testing-library/react";
import AddProductForm from "../components/AddProductForm";

describe("AddProductForm", () => {
  let component;
  let func;
  describe("empty form inputs", () => {
    func = jest.fn();
    beforeEach(() => {
      component = render(<AddProductForm onAddProduct={func} />);
    });

    it("has title input", () => {
      expect(
        component.container.querySelector('[name="title"]')
      ).toBeInTheDocument();
    });

    it("has price input", () => {
      expect(
        component.container.querySelector('[name="price"]')
      ).toBeInTheDocument();
    });

    it("has quantity input", () => {
      expect(
        component.container.querySelector('[name="quantity"]')
      ).toBeInTheDocument();
    });

    describe("then fill in inputs", () => {
      const title = "Fancy Gentlemans Jacket";
      const price = "150.00";
      const quantity = "2";

      it("state reflects `onChange` for `title` input", () => {
        let input = component.container.querySelector('[name="title"]');
        fireEvent.change(input, {
          target: {
            name: "title",
            value: "Fancy Gentlemans Jacket",
          },
        });

        expect(input.value).toEqual(title);
      });

      it("state reflects `onChange` for `price` input", () => {
        let input = component.container.querySelector('[name="price"]');
        fireEvent.change(input, {
          target: {
            name: "price",
            value: "150.00",
          },
        });

        expect(input.value).toEqual(price);
      });

      it("state reflects `onChange` for `quantity` input", () => {
        let input = component.container.querySelector('[name="quantity"]');
        fireEvent.change(input, {
          target: {
            name: "quantity",
            value: "2",
          },
        });

        expect(input.value).toEqual(quantity);
      });

      describe("then submit form", () => {
        it("`onAddProduct` is called", () => {
          let button = component.getByTestId("submit");
          fireEvent.click(button, { preventDefault: () => {} });
          expect(func.mock.calls.length).toBe(1);
        });

        it("`onAddProduct` is passed new product", () => {
          let button = component.getByTestId("submit");
          fireEvent.click(button, { preventDefault: () => {} });
          const product = {
            title: component.container.querySelector("[name='title']").value,
            price: component.container.querySelector("[name='price']").value,
            quantity:
              component.container.querySelector("[name='quantity']").value,
          };
          expect(func.mock.calls[0][0]).toEqual(product);
        });

        it("state is emptied", () => {
          const fields = { title: "", price: "", quantity: "" };
          let button = component.getByTestId("submit");
          fireEvent.click(button, {
            preventDefault: () => {},
          });
          const product = {
            title: component.container.querySelector("[name='title']").value,
            price: component.container.querySelector("[name='price']").value,
            quantity:
              component.container.querySelector("[name='quantity']").value,
          };
          expect(product).toEqual(fields);
        });
      });
    });
  });
});
