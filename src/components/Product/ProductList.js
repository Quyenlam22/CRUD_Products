import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getProductList } from "../../services/ProductService";

function ProductList(props) {
    const { reload } = props;
    const [data, setData] = useState([]);
    const [editReload, setEditReload] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getProductList();
            setData(result.reverse());
        }
        fetchApi();
    }, [reload, editReload]);

    const handleReload = () => {
        setEditReload(!editReload);
    }
    
    return(
        <>
            <div className="product__change">
            </div>
            <div className="product__list">
                {data.map(item => (
                    <div className="product__item" key={item.id}>
                        <img className="product__image" src={item.thumbnail} alt={item.title}/>
                        <div className="product__content">
                            <h3 className="product__title">{item.title}</h3>
                            <p className="product__price">${item.price}$</p>
                            <p className="product__stock">Còn lại: ${item.stock} sản phẩm</p>
                            <p className="product__discountPercentage">${item.discountPercentage}%</p>
                        </div>
                        <div className="product__change">
                            <EditProduct onReload={handleReload} item={item}/>
                            <DeleteProduct onReload={handleReload} item={item}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductList;