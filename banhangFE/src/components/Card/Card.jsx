import { useEffect, useState } from "react";
import "./Card.scss";

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

function stringToNumber(str){
    var num = parseInt(str.replace(/\./g, ""));
    return num;
}

function numberToString(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function Card() {
  const [memoryCurrent, setMemoryCurrent] = useState(0);
  const [priceMemoryCurrent,setPriceMemoryCurrent] = useState(data.memoryPrice[0]);

  useEffect(()=>{
    setPriceMemoryCurrent(data.memoryPrice[memoryCurrent]);
  },[memoryCurrent])

  return (
    <div className="cardproduct">
      <div className="cardproduct__img">
        <span>
          <img src="/src/assets/image/imageiphone/iphone1.webp" />
        </span>
        <div className="cardproduct__label">
          <span className="badge bg-warning">Trả góp 0%</span>
          <span className="badge bg-danger">{`Giảm 3.100.000đ`}</span>
        </div>
      </div>

      <div className="cardproduct__infor">
        <h1>{data.name}</h1>
        <div className="cardproduct__infor__memoryprice">
          {data.memoryPrice.map((item, index) => {
            return (
              <div
                key={index}
                className={`cardproduct__infor__memoryprice--item ${
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
        
        <div className="cardproduct__infor__price">
            <div className="cardproduct__infor__price--newprice">
                {`${priceMemoryCurrent.price}₫`}
            </div>
            <div className="cardproduct__infor__price--oldprice">
                {`${numberToString(stringToNumber(priceMemoryCurrent.price)*(data.discount+100)/100)}₫`}
            </div>
        </div>

        <div className="cardproduct__infor__config">
          <span><i className="fa-solid fa-sd-card"></i>{data.cpu}</span>
          <span><i className="fa-solid fa-mobile-screen"></i>{data.screen}</span>
          <span><i className="fa-solid fa-microchip"></i>{data.ram}</span>
          <span><i className="fa-solid fa-memory"></i>{priceMemoryCurrent.memory}</span>
        </div>
      </div>

      <button className="cardproduct__buttonbuy">
        <a href="/detail">MUA NGAY</a>
      </button>
    </div>
  );
}

export default Card;
