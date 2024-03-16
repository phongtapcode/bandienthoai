import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignIn from "../pages/SignIn/SignIn";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import SignUp from "../pages/SignUp/SignUp";
export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: "/products",
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: "/sign-in",
        page: SignIn,
        isShowHeader: false
    },
    {
        path: "/sign-up",
        page: SignUp,
        isShowHeader: false
    },
    {
        path: "/detail",
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path: "*",
        page: NotFoundPage,
        isShowHeader: false
    },
]