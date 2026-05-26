import { useAppSelector } from "@/store/hooks";
import ToastItem from "./ToastItem";

import styles from "./styles.module.css";
const { toastList } = styles;

const ToastList = () => {
  const { records } = useAppSelector((state) => state.toasts);

  return (
    <div className={toastList}>
      {records.map(({ id, type, title, message }) => (
        <ToastItem
          key={id}
          id={id}
          type={type}
          title={title}
          message={message}
        />
      ))}
    </div>
  );
};

export default ToastList;
