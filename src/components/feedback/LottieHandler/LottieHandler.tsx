import Lottie from "lottie-react";
import notFound from "@/assets/lotties/notFound.json";
import error from "@/assets/lotties/error.json";
import loading from "@/assets/lotties/loading.json";
import empty from "@/assets/lotties/empty.json";
import success from "@/assets/lotties/success.json";

const lottieFilesMap = {
  notFound,
  error,
  loading,
  empty,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  const messageStyle =
    type === "error"
      ? { color: "red", fontSize: "19px" }
      : { marginTop: "30px", fontSize: "19px" };
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
