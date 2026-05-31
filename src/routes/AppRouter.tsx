import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(
  () => import("@/layouts/ProfileLayout/ProfileLayout"),
);

// Components
import { PageSuspenseFallback } from "@/components/feedback";

// Lottie Animation
import { LottieHandler } from "@/components/feedback";

// Protected Routes
import ProtectedRoutes from "@/components/Auth/ProtectedRoutes";

// Pages
const Home = lazy(() => import("@/pages/Home"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Cart = lazy(() => import("@/pages/Cart"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Categories = lazy(() => import("@/pages/Categories"));
const Products = lazy(() => import("@/pages/Products"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Account = lazy(() => import("@/pages/Account"));
const Orders = lazy(() => import("@/pages/Orders"));

// Error
import Error from "@/pages/Error";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div style={{ marginTop: "10%" }}>
              <LottieHandler type="loading" message="Loading please wait..." />
            </div>
          }
        >
          <MainLayout />
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <PageSuspenseFallback>
              <Home />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoutes>
              <PageSuspenseFallback>
                <Wishlist />
              </PageSuspenseFallback>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes>
              <PageSuspenseFallback>
                <Cart />
              </PageSuspenseFallback>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/about-us",
          element: (
            <PageSuspenseFallback>
              <AboutUs />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "/categories",
          element: (
            <PageSuspenseFallback>
              <Categories />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "/categories/products/:prefix",
          element: (
            <PageSuspenseFallback>
              <Products />
            </PageSuspenseFallback>
          ),
          loader: ({ params }) => {
            if (
              typeof params.prefix !== "string" ||
              !/^[a-z]+$/i.test(params.prefix)
            ) {
              throw new Response("Bad request", {
                status: 400,
                statusText: "Category not Found",
              });
            }
            return true;
          },
        },
        {
          path: "/register",
          element: (
            <PageSuspenseFallback>
              <Register />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "/login",
          element: (
            <PageSuspenseFallback>
              <Login />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <PageSuspenseFallback>
                <ProfileLayout />
              </PageSuspenseFallback>
            </ProtectedRoutes>
          ),
          children: [
            {
              index: true,
              element: (
                <PageSuspenseFallback>
                  <Account />
                </PageSuspenseFallback>
              ),
            },
            {
              path: "orders",
              element: (
                <PageSuspenseFallback>
                  <Orders />
                </PageSuspenseFallback>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
