import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { deleteProduct } from '../../services/ProductService';

function DeleteProduct(props) {
    const { item, onReload } = props;

    const deleteItem = async () => {
        const result = await deleteProduct(item.id);
        if(result) {
            onReload();
            Swal.fire({
                title: "Thành công!",
                text: "Sản phẩm đã được xóa!",
                icon: "success"
            });
        }
    }

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
                deleteItem();
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