import { useEffect, useState, memo } from "react";
import { useAppDispatch } from "@/store/hooks";
import { actLikeToggle } from "@/store/wishlist/wishlistSlice";
import { addToCart } from "@/store/cart/cartSlice";
import { addToast } from "@/store/toasts/toastsSlice";
import { ProductInfo } from "@/components/eCommerce";
import Like from "@/assets/svg/like.svg?react";
import LikeFill from "@/assets/svg/like-fill.svg?react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { TProduct } from "@/types";

import styles from "./styles.module.css";
const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    title,
    img,
    price,
    quantity,
    max,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);
    const [istBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedMax = currentRemainingQuantity == 0 ? true : false;

    useEffect(() => {
      if (!istBtnDisabled) {
        return;
      }
      setIsBtnDisabled(true);
      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [istBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      dispatch(
        addToast({
          type: "success",
          title: "Add to cart",
          message: `Item: ${title} added to cart`,
        }),
      );
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => {
              setIsLoading(false);
              if (!isLiked) {
                dispatch(
                  addToast({
                    type: "success",
                    message: `${title} added to wishlist`,
                  }),
                );
              }
            })
            .catch(() => {
              setIsLoading(false);
              dispatch(
                addToast({
                  title: "Failed Operation",
                  type: "error",
                  message: `Failed to add wishlist, error from server`,
                }),
              );
            });
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <ProductInfo title={title} img={img} price={price}>
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="danger" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachedMax
              ? "You've reached to the limit"
              : `Remaining: ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={addToCartHandler}
            disabled={istBtnDisabled || quantityReachedMax}
          >
            {istBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  },
);

export default Product;
