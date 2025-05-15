import { useEffect, useState } from "react";
import Modal from 'react-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function CreateProduct(props) {
    const { onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            fetch(`http://localhost:3003/categories`)
                .then(res => res.json())
                .then(data => {
                    setDataCategory(data);
                })
        }
        fetchApi();
    }, []);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3003/products`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data) {
                    setShowModal(false);
                    onReload();
                    Swal.fire({
                        // position: "center",
                        icon: "success",
                        title: "Thêm sản phẩm thành công!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <button onClick={openModal}>Thêm mới sản phẩm</button>
            <div>
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Tiêu đề</td>
                                    <td>
                                        <input type='text' name="title" onChange={handleChange} required/>
                                    </td>
                                </tr>
                                {(dataCategory.length > 0) && (
                                    <tr>
                                        <td>Danh mục</td>
                                        <td>
                                            <select name="category" onChange={handleChange}>
                                                {dataCategory.map((item, index) => (
                                                    <option key={index} value={item.name}>{item.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Giá</td>
                                    <td>
                                        <input type='text' name="price" onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giảm giá</td>
                                    <td>
                                        <input type='text' name="discountPercentage" onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Số lượng còn lại</td>
                                    <td>
                                        <input type='text' name="stock" onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ảnh</td>
                                    <td>
                                        <input type='text' name="thumbnail" onChange={handleChange} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mô tả</td>
                                    <td>
                                        <textarea name="description" onChange={handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={closeModal}>Hủy</button>
                                    </td>
                                    <td>
                                        <input type="submit" value='Thêm mới'/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </Modal>
                </div>
        </>
    )
}

export default CreateProduct;