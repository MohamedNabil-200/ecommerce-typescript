import useOrders from "@/hooks/useOrders";
import { Loading } from "@/components/feedback";
import { Heading } from "@/components/common";
import { ProductInfo } from "@/components/eCommerce";
import { Table, Modal } from "react-bootstrap";

const Orders = () => {
  const {
    loading,
    error,
    ordersList,
    showModal,
    selectedProduct,
    closeModalHandler,
    viewDetailsHandler,
  } = useOrders();

  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              price={el.price}
              quantity={el.quantity}
              img={el.img}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="My orders" />
      <Loading status={loading} error={error} type="table">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} item(s) {" / "}{" "}
                  <span
                    onClick={() => {
                      viewDetailsHandler(el.id);
                    }}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Product Details
                  </span>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
