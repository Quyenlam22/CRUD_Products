import { useEffect, useState } from "react";
import Modal from 'react-modal';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getCategoryList } from "../../services/CategoryService";
import { editProduct } from "../../services/ProductService";

function EditProduct(props) {
    const { item, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item);
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCategoryList();
            setDataCategory(result);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await editProduct(data, item.id)
        if(result) {
            setShowModal(false);
            onReload();
            Swal.fire({
                // position: "center",
                icon: "success",
                title: "Cập nhật sản phẩm thành công!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <button onClick={openModal}>Chỉnh sửa</button>
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
                                        <input type='text' name="title" onChange={handleChange} required  value={data.title}/>
                                    </td>
                                </tr>
                                {(dataCategory.length > 0) && (
                                    <tr>
                                        <td>Danh mục</td>
                                        <td>
                                            <select name="category" onChange={handleChange} value={data.category}>
                                                {dataCategory.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Giá</td>
                                    <td>
                                        <input type='text' name="price" onChange={handleChange} required value={data.price}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giảm giá</td>
                                    <td>
                                        <input type='text' name="discountPercentage" onChange={handleChange} required value={data.discountPercentage}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Số lượng còn lại</td>
                                    <td>
                                        <input type='text' name="stock" onChange={handleChange} required value={data.stock}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ảnh</td>
                                    <td>
                                        <input type='text' name="thumbnail" onChange={handleChange} required value={data.thumbnail}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mô tả</td>
                                    <td>
                                        <textarea name="description" onChange={handleChange} value={data.description}></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={closeModal}>Hủy</button>
                                    </td>
                                    <td>
                                        <input type="submit" value='Cập nhật'/>
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

export default EditProduct;