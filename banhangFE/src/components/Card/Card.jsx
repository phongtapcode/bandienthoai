import { useEffect, useState } from "react";
import "./Card.scss";

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

function stringToNumber(str){
    var num = parseInt(str.replace(/\./g, ""));
    return num;
}

function numberToString(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function Card() {

  return (
    <div className="cardproduct">
      <div className="cardproduct__img">
        <span>
          <img src="/src/assets/image/imageiphone/iphone1.webp" />
        </span>
        <div className="cardproduct__label">
          <span className="badge bg-danger">{`Giảm ${data.discount}%`}</span>
        </div>
      </div>

      <div className="cardproduct__infor">
        <h1>{data.name}</h1>
        
        <div className="cardproduct__infor__price">
            <div className="cardproduct__infor__price--newprice">
                {`${data.price}₫`}
            </div>
            <div className="cardproduct__infor__price--oldprice">
                {`${numberToString(stringToNumber(data.price)*(data.discount+100)/100)}₫`}
            </div>
        </div>

        <div className="cardproduct__infor__config">
          <span><i className="fa-solid fa-sd-card"></i>{data.cpu}</span>
          <span><i className="fa-solid fa-mobile-screen"></i>{data.screen}</span>
          <span><i className="fa-solid fa-microchip"></i>{data.ram}</span>
          <span><i className="fa-solid fa-memory"></i>{data.memory}</span>
        </div>
      </div>

      <button className="cardproduct__buttonbuy">
        <a href="/detail">MUA NGAY</a>
      </button>
    </div>
  );
}

export default Card;
