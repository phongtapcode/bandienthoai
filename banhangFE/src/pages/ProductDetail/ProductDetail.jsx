import { useState, useEffect } from "react";
import "./ProductDetail.scss";

const data = {
  name: "iPhone 15 Pro Max",
  rating: "5",
  description:  "Sản phẩm tốt",
  selled: 500,
  memory: 256,
  discount: 5,
  price: "5.700.000",
  cpu: "Apple A17 Pro",
  screen: "6.7inch",
  ram: "8GB",
};

function ProductDetail() {
  const [isParam,setIsParam] = useState(false);
  const [countProduct, setCountProduct] = useState(1);

  const handleNoneParam = ()=>{
    setIsParam(!isParam);
  }

  return (
    <main className="productdetail">

      <div className="productdetail__image">
        <img src="https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2023/9/20/638307989548944936_iphone-15-promax-xanh-1.jpg"/>
      </div>

      <div className="productdetail__infor">
        <h1 className="productdetail__infor--title">{data.name}</h1>
        <span className="productdetail__infor--price">{`${data.price}₫`}</span>

        <div className="productdetail__infor--shortdescription">
          <span>
            <i className="fa-solid fa-check"></i>TÌNH TRẠNG: MỚI 100% QUỐC TẾ
          </span>
          <span>
            <i className="fa-solid fa-check"></i>BẢO HÀNH: 12 THÁNG APPLE
          </span>
          <span>
            <i className="fa-solid fa-check"></i>TRỌN BỘ: NGUYÊN SEAL CHƯA ACTIVE
          </span>
        </div>

        <div className="productdetail__infor__countproduct">
          <div className="productdetail__infor__countproduct--location">
            Giao đến <p>huyện Tiên Du, tỉnh Bắc Ninh</p>-
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
          <div className="productdetail__infor__countproduct--buttonbuy">
            MUA NGAY
          </div>
        </div>
        <span className="productdetail__infor__detailparam" onClick={handleNoneParam}>{`Xem chi tiết thông số kĩ thuật`}</span>
        {
          isParam && (
        <div className="productdetail__infor__param">
          <span><i className="fa-solid fa-sd-card"></i>{data.cpu}</span>
          <span><i className="fa-solid fa-mobile-screen"></i>{data.screen}</span>
          <span><i className="fa-solid fa-microchip"></i>{data.ram}</span>
          <span><i className="fa-solid fa-memory"></i>{data.memory}</span>
        </div>
          )
        }
      </div>
    </main>
  );
}

export default ProductDetail;
