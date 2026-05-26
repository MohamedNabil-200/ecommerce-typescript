import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actGetOrders, resetOrderStatus } from "@/store/orders/ordersSlice";
import { TProduct } from "@/types";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, ordersList } = useAppSelector(
    (state) => state.orders,
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  const viewDetailsHandler = (id: number) => {
    const productDetails = ordersList.find((order) => order.id === id);
    const newItems = productDetails?.items ?? [];

    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());

    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    ordersList,
    showModal,
    selectedProduct,
    closeModalHandler,
    viewDetailsHandler,
  };
};

export default useOrders;
