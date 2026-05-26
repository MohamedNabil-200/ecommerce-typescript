import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actAuthRegister, resetUI } from "@/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerType } from "@/validations/registerSchema";
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";

const useRegister = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { errors: formErrors },
  } = useForm<registerType>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const {
    enteredEmail,
    emailAvailabilityStatus,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const submitForm: SubmitHandler<registerType> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && enteredEmail !== value) {
      // Checking
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    accessToken,
    errors: formErrors,
    emailAvailabilityStatus,
    register,
    handleSubmit,
    submitForm,
    emailOnBlurHandler,
  };
};

export default useRegister;
