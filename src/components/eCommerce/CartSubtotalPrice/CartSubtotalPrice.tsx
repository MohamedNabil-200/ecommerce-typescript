import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { cartCleanupAfterPlaceOrder } from "@/store/cart/cartSlice";
import { actPlaceOrder } from "@/store/orders/ordersSlice";
import { TProduct } from "@/types";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";

type TCartSubtotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubtotalPrice = ({
  products,
  userAccessToken,
}: TCartSubtotalPriceProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [showModal, setShowModal] = useState(false);

  const subtotal = products.reduce((acc, el) => {
    const price = el.price;
    const quantity = el.quantity;

    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(cartCleanupAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Subtotal:{" "}
          {subtotal.toFixed(2)} EGP
          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal: </span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={modalHandler}
          >
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
