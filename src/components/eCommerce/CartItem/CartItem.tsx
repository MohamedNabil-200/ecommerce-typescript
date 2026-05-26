import { memo } from "react";
import { ProductInfo } from "@/components/eCommerce";
import { Form, Button } from "react-bootstrap";
import { TProduct } from "@/types";

import styles from "./styles.module.css";
const { cartItem, cartItemSelection } = styles;

type TCartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    changeQuantityHandler,
    removeItemHandler,
  }: TCartItemProps) => {
    // Render Options List
    const renderOptions = Array(max)
      .fill(0)
      .map((_, i) => {
        const quantity = ++i;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = Number(event.target.value);
      changeQuantityHandler(id, quantity);
    };

    return (
      <div className={cartItem}>
        <ProductInfo title={title} img={img} price={price} direction="column">
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  },
);

export default CartItem;
