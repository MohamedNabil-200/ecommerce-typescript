import styles from "./styles.module.css";
const { toastItem } = styles;

const ToastItem = () => {
  return (
    <div className={`alert alert-danger ${toastItem}`}>
      <h5>Title</h5>
      <p>This is message</p>
      <button className="btn-close" />
      <span className="placeholder"></span>
    </div>
  );
};

export default ToastItem;
