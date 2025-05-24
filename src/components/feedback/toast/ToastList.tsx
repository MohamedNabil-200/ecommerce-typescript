import ToastItem from "./ToastItem";

import styles from "./styles.module.css";
const { toastList } = styles;

const ToastList = () => {
  return (
    <div className={toastList}>
      <ToastItem />
      <ToastItem />
    </div>
  );
};

export default ToastList;
