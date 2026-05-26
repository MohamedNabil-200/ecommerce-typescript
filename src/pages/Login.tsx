import useLogin from "@/hooks/useLogin";
import { Navigate } from "react-router-dom";
import { Heading } from "@/components/common";
import { Input } from "@/components/forms";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

const Login = () => {
  const {
    loading,
    error,
    accessToken,
    searchParams,
    errors: formErrors,
    register,
    handleSubmit,
    submitForm,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "login_required" && (
            <Alert variant="warning">
              You need to login to view this content
            </Alert>
          )}
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email Address"
              name="email"
              register={register}
              error={formErrors.email?.message as string}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message as string}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
