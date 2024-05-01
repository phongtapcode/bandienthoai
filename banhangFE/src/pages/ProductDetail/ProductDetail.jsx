import { useState, useEffect } from "react";
import "./ProductDetail.scss";
import { useLocation, useParams,useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { addOrderProduct } from "../../redux/action";
import { useDispatch } from "react-redux";

function stringToNumber(str) {
  var num = parseInt(str);
  return num;
} 

function numberToString(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function ProductDetail() {
  const [isParam,setIsParam] = useState(false);
  const [countProduct, setCountProduct] = useState(1);
  const [dataProduct,setDataProduct] = useState({});
  const user = useSelector((state) => state.dataUser);
  const params = useParams();
  const dispatch = useDispatch();
  const handleNoneParam = ()=>{
    setIsParam(!isParam);
  }
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProductDetail = async (context) => {
    const  id = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getDetailProduct(id);
    return res.data;
  };

  const {isLoading,data} = useQuery({
    queryKey: ["productdetail",params.id],
    queryFn: fetchProductDetail, // Sử dụng queryFn để truyền hàm lấy dữ liệu
    enabled: !!params.id
  });

  useEffect(()=>{
    setDataProduct(data);
  },[data])

  const handleAddOrderProduct = () => {
    if(!user?.id){
      navigate("/sign-in",{state: location?.pathname});
    }else{
      dispatch(addOrderProduct({
        orderItem: {
          name: dataProduct?.name,
          amount: countProduct,
          image: dataProduct?.image,
          price: dataProduct?.price,
          discount: dataProduct?.discount,
          product: dataProduct?._id
        }

      }))
    }
  }

  return (
    <Loading isLoading={isLoading}>
    <main className="productdetail">

      <div className="productdetail__image">
        <img src={dataProduct?.image}/>
      </div>

      <div className="productdetail__infor">
        <h1 className="productdetail__infor--title">{dataProduct?.name}</h1>

        <div className="productdetail__evaluate">
        <span className="productdetail__evaluate--rating"><i className="fa-solid fa-star"></i>5.0</span>
        <span className="productdetail__evaluate--selled">{`Đã bán ${dataProduct?.selled} +`}</span>
      </div>

        <span className="productdetail__infor--pricenew">{`${numberToString(
              Math.ceil(
                (stringToNumber(dataProduct?.price) *
                  (100 - dataProduct?.discount)) /
                  100
              )
            )}₫`}</span>
            <span className="productdetail__infor--priceold">{`${numberToString(stringToNumber(dataProduct?.price))}₫`}</span>
        <div className="productdetail__infor--shortdescription">
          <span>
            <i className="fa-solid fa-check"></i>MUA SẮM TIỆN LỢI
          </span>
          <span>
            <i className="fa-solid fa-check"></i>CHẤT LƯỢNG ĐẢM BẢO
          </span>
          <span>
            <i className="fa-solid fa-check"></i>MIỄN PHÍ GIAO HÀNG
          </span>
        </div>

        <div className="productdetail__infor__countproduct">
          <div className="productdetail__infor__countproduct--location">
            Giao đến <p>{user?.address}</p>-
            <a href="/profile">
              Đổi địa chỉ
            </a>
          </div>

          <div className="productdetail__infor__countproduct--buttonadd">
            <button
              onClick={() => {
                setCountProduct(countProduct - 1);
              }}
              style={countProduct === 1 ? { pointerEvents: "none" } : {}}
            >
              -
            </button>
            <span>{countProduct}</span>
            <button
              onClick={() => {
                setCountProduct(countProduct + 1);
              }}
            >
              +
            </button>
          </div>
          <div className="productdetail__infor__countproduct--buttonaddcart" onClick={handleAddOrderProduct}>
          <i className="fa-solid fa-cart-plus"></i>THÊM VÀO GIỎ HÀNG
          </div>
          <div className="productdetail__infor__countproduct--buttonbuy">
            MUA NGAY
          </div>
        </div>
        <span className="productdetail__infor__detailparam" onClick={handleNoneParam}>{`Xem chi tiết thông số kĩ thuật`}</span>
        {
          isParam && (
        <div className="productdetail__infor__param">
          <span><i className="fa-solid fa-sd-card"></i>{dataProduct?.cpu}</span>
          <span><i className="fa-solid fa-mobile-screen"></i>{dataProduct?.screen}</span>
          <span><i className="fa-solid fa-microchip"></i>{dataProduct?.ram}</span>
          <span><i className="fa-solid fa-memory"></i>{dataProduct?.memory}</span>
        </div>
          )
        }
      </div>
    </main>
    </Loading>
  );
}

export default ProductDetail;
