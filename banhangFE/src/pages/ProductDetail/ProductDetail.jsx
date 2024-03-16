import { useState, useEffect } from "react";
import "./ProductDetail.scss";
import { Image } from "antd";
const data = {
  name: "iPhone 15 Pro Max",
  memoryPrice: [
    { memory: "256GB", price: "30.990.000" },
    { memory: "512GB", price: "37.990.000" },
    { memory: "1TB", price: "44.490.000" },
  ],
  discount: 5,
  cpu: "Apple A17 Pro",
  screen: "6.7inch",
  ram: "8GB",
};

function ProductDetail() {
  const [priceMemoryCurrent, setPriceMemoryCurrent] = useState(
    data.memoryPrice[0]
  );
  const [isParam,setIsParam] = useState(false);
  const [memoryCurrent, setMemoryCurrent] = useState(0);
  const [countProduct, setCountProduct] = useState(1);
  useEffect(() => {
    setPriceMemoryCurrent(data.memoryPrice[memoryCurrent]);
  }, [memoryCurrent]);

  const handleNoneParam = ()=>{
    setIsParam(!isParam);
  }

  return (
    <main className="productdetail">

      <div className="productdetail__image">
        <Image
          width={"80%"}
          src="https://images.fpt.shop/unsafe/fit-in/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2023/9/20/638307989548944936_iphone-15-promax-xanh-1.jpg"
        />
      </div>

      <div className="productdetail__infor">
        <h1 className="productdetail__infor--title">{data.name}</h1>
        <span className="productdetail__infor--price">{`${priceMemoryCurrent.price}₫`}</span>
        <div className="productdetail__infor__memoryprice">
          {data.memoryPrice.map((item, index) => {
            return (
              <div
                key={index}
                className={`productdetail__infor__memoryprice--item ${
                  memoryCurrent === index ? "active" : ""
                }`}
                style={{ width: `calc(100%/${data.memoryPrice.length})` }}
                onClick={() => setMemoryCurrent(index)}
              >
                {item.memory}
              </div>
            );
          })}
        </div>

        <div className="productdetail__infor--shortdescription">
          <span>
            <i class="fa-solid fa-check"></i>TÌNH TRẠNG: MỚI 100% QUỐC TẾ
          </span>
          <span>
            <i class="fa-solid fa-check"></i>BẢO HÀNH: 12 THÁNG APPLE
          </span>
          <span>
            <i class="fa-solid fa-check"></i>TRỌN BỘ: NGUYÊN SEAL CHƯA ACTIVE
          </span>
        </div>

        <div className="productdetail__infor__countproduct">
          <div className="productdetail__infor__countproduct--location">
            Giao đến <p>huyện Tiên Du, tỉnh Bắc Ninh</p>-
            <a href="#">
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
          <span><i className="fa-solid fa-memory"></i>{priceMemoryCurrent.memory}</span>
        </div>
          )
        }
      </div>
    </main>
  );
}

export default ProductDetail;
