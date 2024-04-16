import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignIn from "../pages/SignIn/SignIn";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import SignUp from "../pages/SignUp/SignUp";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";

export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true,
        isPrivate: false
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true,
        isPrivate: false
    },
    {
        path: "/profile",
        page: ProfilePage,
        isShowHeader: true,
        isPrivate: false
    },
    {
        path: "/products",
        page: ProductPage,
        isShowHeader: true,
        isPrivate: false
    },
    {
        path: "/sign-in",
        page: SignIn,
        isShowHeader: false,
        isPrivate: false
    },
    {
        path: "/sign-up",
        page: SignUp,
        isShowHeader: false,
        isPrivate: false
    },
    {
        path: "/detail",
        page: ProductDetail,
        isShowHeader: true,
        isPrivate: false
    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: "*",
        page: NotFoundPage,
        isShowHeader: false,
        isPrivate: false
    },
]