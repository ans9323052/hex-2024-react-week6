import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layout/FrontLayout";
import Homepage from "../pages/Homepage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import NotFund from "../pages/NotFund";

const router = createHashRouter([
    {
        path: '/',
        element: <FrontLayout />,
        children: [
            {
                path: '',
                element: <Homepage />,
            },
            {
                path: 'products',
                element: <ProductsPage />,
            },
            {
                path: 'products/:id',
                element: <ProductDetailPage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                path: '*',
                element:<NotFund/>,
            }
        ]
    }

])
export default router;