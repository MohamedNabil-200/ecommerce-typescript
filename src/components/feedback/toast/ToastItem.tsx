import { useAppDispatch } from "@/store/hooks";
import { removeToast } from "@/store/toasts/toastsSlice";
import { TToast } from "@/types";
import styles from "./styles.module.css";
const { toastItem } = styles;

const ToastItem = ({ id, type, title, message }: TToast) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`alert alert-${
        type === "error" ? "danger" : type === "info" ? "primary" : type
      } ${toastItem}`}
    >
      <h5>{title ? title : type}</h5>
      <p>{message}</p>
      <button className="btn-close" onClick={() => dispatch(removeToast(id))} />
      <span className="placeholder"></span>
    </div>
  );
};

export default ToastItem;
