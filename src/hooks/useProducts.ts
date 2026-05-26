import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  actGetProductsByCatPrefix,
  productsRecordsCleanUp,
} from "@/store/products/productsSlice";

const useProducts = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const paramsPrefix = params.prefix;

  const { loading, error, records } = useAppSelector((state) => state.products);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const productFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
    isAuthenticated: accessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string),
    );

    return () => {
      dispatch(productsRecordsCleanUp());
      promise.abort();
    };
  }, [dispatch, params]);

  return { paramsPrefix, loading, error, productFullInfo };
};

export default useProducts;
