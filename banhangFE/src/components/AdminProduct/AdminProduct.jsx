import "./AdminProduct.scss";
import { useEffect, useState } from "react";
import { getBase64 } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { Button, Upload, Image,Modal } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import * as message from "../Message/Message"
import Loading from "../Loading/Loading";

function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state => state?.dataUser));
  const [rowSelected,setRowSelected] = useState('');
  const [action,setAction] = useState("Thêm");
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [productInfor, setProductInfor] = useState({
    name: "",
    type: "",
    countinstock: "",
    price: "",
    discount: "",
    description: "",
    selled: "",
    cpu: "",
    screen: "",
    ram: "",
    memory: "",
    image: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const mutationAdd = useMutation({
    mutationFn: (productInfor) => {
      return ProductService.createProduct(productInfor);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (dataProductUpdate) => {
      const {id,token,...rest} = dataProductUpdate;
      return ProductService.updateProduct(id,rest,token);
    },
  });
  
  useEffect(() => {
    if(mutationUpdate.data?.status === "OK"){
      message.success("Sửa sản phẩm thành công");
    }
  },[mutationUpdate.isSuccess])

  const fetchGetDetaiProduct = async (id) => {
    setRowSelected(id);
    const res = await ProductService.getDetailProduct(id);
    setProductInfor({
      name: res?.data?.name,
      type: res?.data?.type,
      countinstock: res?.data?.countinstock,
      price: res?.data?.price,
      discount: res?.data?.discount,
      description: res?.data?.description,
      selled: res?.data?.selled,
      cpu: res?.data?.cpu,
      screen: res?.data?.screen,
      ram: res?.data?.ram,
      memory: res?.data?.memory,
      image: res?.data?.image
    })
  }

  const handleDetailData = () => {
    console.log(rowSelected)
  }

  const renderAction = () => {
    return (
      <>
        <EditOutlined
          style={{
            fontSize: "20px",
            marginRight: "10px",
            color: "green",
            cursor: "pointer",
          }}
          onClick={()=>{
            handleDetailData()
            showModal()
            setAction("Sửa");
          }}
        />
        <DeleteOutlined
          style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
          onClick={handleDeleteProduct}
        />
      </>
    );
  };
  
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
    },
    {
      title: "Sản phẩm còn lại",
      dataIndex: "countinstock",
    },
    {
      title: "Hãng",
      dataIndex: "type",
    },
    {
      title: "Action",
      render: renderAction,
    },
  ];

  useEffect(() => {
    if(mutationAdd.data?.status === "OK"){
      message.success("Tạo sản phẩm thành công");
    }
  },[mutationAdd.isSuccess])

  const handleOk = () => {
    if(action==="Thêm"){
      mutationAdd.mutate(productInfor,{
        onSettled: () => {
          queryProduct.refetch();
        }
      });
    }else if(action==="Sửa"){
      mutationUpdate.mutate({id: rowSelected,token: user?.access_token,...productInfor},{
        onSettled: () => {
          queryProduct.refetch();
        }
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  //retry: Xác định số lần thử lại khi có lỗi xảy ra khi gọi API.
  const queryProduct = useQuery({
    queryKey: ["product"],
    queryFn: fetchProductAll, // Sử dụng queryFn để truyền hàm lấy dữ liệu
    config: { retry: 3, retryDelay: 1000 },
  });

  const { data } = queryProduct;

  const dataTable = data?.data.map((product) => {
    return { ...product, key: product._id };
  });

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[fileList.length - 1];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setProductInfor({ ...productInfor, ["image"]: file.preview });
  };

  const handleOnChange = (e) => {
    setProductInfor({
      ...productInfor,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenShowModelAdd = () => {
    showModal()
    setAction("Thêm")
    setProductInfor({
      name: "",
      type: "",
      countinstock: "",
      price: "",
      discount: "",
      description: "",
      selled: "",
      cpu: "",
      screen: "",
      ram: "",
      memory: "",
      image: ""
    })
  }

  const mutationDelete = useMutation({
    mutationFn: (dataProductDelete) => {
      const {id,token} = dataProductDelete;
      return ProductService.deleteProduct(id,token);
    },
  });
  
  useEffect(() => {
    if(mutationDelete.data?.status === "OK"){
      message.success("Xóa sản phẩm thành công");
    }
  },[mutationDelete.isSuccess])

  const handleDeleteProduct = () => {
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    mutationDelete.mutate({id: rowSelected,token: user?.access_token},{
      onSettled: () => {
        queryProduct.refetch();
      }
    })
    setIsModalOpenDelete(false);
  };
  const handleCancelDelte = () => {
    setIsModalOpenDelete(false);
  };

  return (
    <div className="adminproduct">
      <h1>Danh sách sản phẩm</h1>
      <>
      <Button type="primary" onClick={handleOpenShowModelAdd}>
        Thêm mới
      </Button>
      <Modal
        title={`${action} sản phẩm`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={action}
      >
        <Loading isLoading={mutationUpdate.isPending || mutationAdd.isPending}>
        <div className="modal__item">
          <label>Tên</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleOnChange}
            value={productInfor.name}
          />
        </div>
        <div className="modal__item">
          <label>Thể loại</label>
          <input
            type="text"
            name="type"
            placeholder="Type"
            onChange={handleOnChange}
            value={productInfor.type}
          />
        </div>
        <div className="modal__item">
          <label>Sản phẩm còn lại</label>
          <input
            type="text"
            name="countinstock"
            placeholder="Countinstock"
            onChange={handleOnChange}
            value={productInfor.countinstock}
          />
        </div>
        <div className="modal__item">
          <label>Giá</label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            onChange={handleOnChange}
            value={productInfor.price}
          />
        </div>
        <div className="modal__item">
          <label>Giảm giá (%)</label>
          <input
            type="text"
            name="discount"
            placeholder="Discount"
            onChange={handleOnChange}
            value={productInfor.discount}
          />
        </div>
        <div className="modal__item">
          <label>Mô tả</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleOnChange}
            value={productInfor.description}
          />
        </div>
        <div className="modal__item">
          <label>Đã bán</label>
          <input
            type="text"
            name="selled"
            placeholder="Selled"
            onChange={handleOnChange}
            value={productInfor.selled}
          />
        </div>
        <div className="modal__item">
          <label>CPU</label>
          <input
            type="text"
            name="cpu"
            placeholder="CPU"
            onChange={handleOnChange}
            value={productInfor.cpu}
          />
        </div>
        <div className="modal__item">
          <label>Screen</label>
          <input
            type="text"
            name="screen"
            placeholder="Screen"
            onChange={handleOnChange}
            value={productInfor.screen}
          />
        </div>
        <div className="modal__item">
          <label>Ram</label>
          <input
            type="text"
            name="ram"
            placeholder="Ram"
            onChange={handleOnChange}
            value={productInfor.ram}
          />
        </div>
        <div className="modal__item">
          <label>Memory</label>
          <input
            type="text"
            name="memory"
            placeholder="Memory"
            onChange={handleOnChange}
            value={productInfor.memory}
          />
        </div>
        <Upload onChange={handleOnChangeAvatar} className="uploadfile">
          <label style={{ width: "110px" }}>Ảnh</label>
          <Button icon={<UploadOutlined />} className="buttonupload">Upload</Button>
        </Upload>
        <div className="imgproduct">
          <Image src={productInfor.image}/>
          </div>
          </Loading>
      </Modal>
      </>

      <>
      <Modal title="Basic Modal" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelte}>
        Bạn có chắn chắn muốn xóa
      </Modal>
      </>

      <div>
        <TableComponent columns={columns} dataTable={dataTable} onRow = {(record,rowIndex) => {
          return {
            onClick: () => {
              setRowSelected(record._id);
              fetchGetDetaiProduct(record._id);
            }
          }
        }}/>
      </div>
    </div>
  );
}

export default AdminProduct;
