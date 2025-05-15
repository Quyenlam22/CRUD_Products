import { useEffect, useState } from "react";

function ProductList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            fetch(`http://localhost:3003/products`)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                })
        }
        fetchApi();
    }, []);
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
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductList;