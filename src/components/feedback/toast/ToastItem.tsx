import { TToast } from "@types";
import styles from "./styles.module.css";
const { toastItem } = styles;

const ToastItem = ({ type, title, message }: TToast) => {
  return (
    <div
      className={`alert alert-${
        type === "error" ? "danger" : type === "info" ? "primary" : type
      } ${toastItem}`}
    >
      <h5>{title ? title : type}</h5>
      <p>{message}</p>
      <button className="btn-close" />
      <span className="placeholder"></span>
    </div>
  );
};

export default ToastItem;
