import { useAppSelector } from "@/store/hooks";
import { getCartTotalQuantitySelector } from "@/store/cart/selectors";
import WishlistIcon from "@/assets/svg/wishlist.svg?react";
import CartIcon from "@/assets/svg/cart.svg?react";
import HeaderCounter from "../HeaderCounter/HeaderCounter";

import styles from "./styles.module.css";

const HeaderLeftBar = () => {
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const wishlistTotalQuantity = wishlistItemsId.length;

  const CartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);

  return (
    <div className={styles.headerLeftBar}>
      <HeaderCounter
        title="Wishlist"
        path="/wishlist"
        svgIcon={<WishlistIcon title="Wishlist Icon" />}
        totalQuantity={wishlistTotalQuantity}
      />
      <HeaderCounter
        title="Cart"
        path="/cart"
        svgIcon={<CartIcon title="Cart Icon" />}
        totalQuantity={CartTotalQuantity}
      />
    </div>
  );
};

export default HeaderLeftBar;
