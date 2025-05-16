import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function DeleteProduct(props) {
    const { item, onReload } = props;
    const [data, setData] = useState(item);

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

    const handleDelete = () => {
        Swal.fire({
            title: "Đồng ý xóa?",
            text: "Bạn sẽ không thể khôi phục lại sản phẩm này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3003/products/${item.id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data) {
                            onReload();
                            Swal.fire({
                                title: "Thành công!",
                                text: "Sản phẩm đã được xóa!",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <>
            <button onClick={handleDelete}>Xóa</button>
        </>
    )
}

export default DeleteProduct;