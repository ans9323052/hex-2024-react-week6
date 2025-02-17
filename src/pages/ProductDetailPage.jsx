import { useState, useEffect } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;



export default function ProductDetailPage() {
    const [product, setProduct] = useState({});
    const [qtySelect, setQtySelect] = useState(1);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isScreenLoading, setIsScreenLoading] = useState(false);
    useEffect(() => {
        const getProduct = async () => {
            setIsScreenLoading(true);
            try {
                const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
                setProduct(res.data.product);
            } catch (error) {
                alert("取得產品失敗");
            } finally {
                setIsScreenLoading(false);
            }
        };
        getProduct();
    }, []);
    const addCartItem = async (product_id, qty) => {
        setIsLoading(true);
        try {
            await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
                data: {
                    product_id, qty: Number(qty)
                }
            })

        } catch (error) {
            alert('加入購物車失敗');
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6">
                        <img className="img-fluid" src={product.imageUrl} alt={product.title} />
                    </div>
                    <div className="col-6">
                        <div className="d-flex align-items-center gap-2">
                            <h2>{product.title}</h2>
                            <span className="badge text-bg-success">{product.category}</span>
                        </div>
                        <p className="mb-3">{product.description}</p>
                        <p className="mb-3">{product.content}</p>
                        <h5 className="mb-3">NT$ {product.price}</h5>
                        <div className="input-group align-items-center w-75">
                            <select
                                value={qtySelect}
                                onChange={(e) => setQtySelect(e.target.value)}
                                id="qtySelect"
                                className="form-select"
                            >
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                            <button type="button" disabled={isLoading} className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={() => addCartItem(id, qtySelect)}>
                                加到購物車{isLoading && <ReactLoading
                                    type={"spin"}
                                    color={"#000"}
                                    height={"1rem"}
                                    width={"1rem"}
                                />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                isScreenLoading && (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            inset: 0,
                            position: 'fixed',
                            zIndex: 999,
                        }}
                    >
                        <ReactLoading type="spin" color="black" height="4rem" width="4rem" />
                    </div>
                )
            }
        </>
    )
}