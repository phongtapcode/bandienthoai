import "./Header.scss";
import { Input } from "antd";
import ItemCategory from "./components/ItemCategory/ItemCategory";
import { useState } from "react";
import {Badge} from "antd";
import { useSelector } from "react-redux";

const { Search } = Input;

const menu = [
  {
    title: "TRANG CHỦ",
    href: "/",
  },
  {
    title: "GIỚI THIỆU",
    href: "#",
  },
  {
    title: "SẢN PHẨM",
    href: "#",
  },
  {
    title: "KINH NGHIỆM HAY",
    href: "#",
  },
  {
    title: "LIÊN HỆ",
    href: "#",
  },
  {
    title: "HỆ THỐNG SIÊU THỊ",
    href: "#",
  },
];

const categoryTech = [
  {
    title: "Điện thoại",
    children: [
      { name: "Apple", href: "#" },
      { name: "Samsung", href: "#" },
      { name: "Xiaomi", href: "#" },
      { name: "Nokia", href: "#" },
      { name: "Apple", href: "#" },
    ],
    iconChevron: true,
    iconMain: "fa-solid fa-mobile-screen-button",
  },
  {
    title: "Laptop",
    children: [
      { name: "Macbook", href: "#" },
      { name: "Laptop Dell", href: "#" },
      { name: "Laptop HP", href: "#" },
      { name: "Laptop Asus", href: "#" },
    ],
    iconChevron: true,
    iconMain: "fa-solid fa-laptop",
  },
  {
    title: "Tablet",
    children: [
      { name: "Talet Ipad", href: "#" },
      { name: "Tablet Beneve", href: "#" },
      { name: "Tablet Itel", href: "#" },
      { name: "Tablet Kindle", href: "#" },
      { name: "Tablet Samsung", href: "#" },
    ],
    iconChevron: true,
    iconMain: "fa-solid fa-tablet",
  },
  {
    title: "Phụ kiện",
    children: [
      { name: "Bao da ốp lưng", href: "#" },
      { name: "Loa", href: "#" },
      { name: "Sạc", href: "#" },
      { name: "Tai nghe", href: "#" },
      { name: "Cường lực", href: "#" },
    ],
    iconChevron: true,
    iconMain: "fa-solid fa-headphones",
  },
  {
    title: "Smart Watch",
    iconChevron: false,
    iconMain: "fa-regular fa-clock",
  },
  {
    title: "Apple Watch",
    iconChevron: false,
    iconMain: "fa-solid fa-mobile-button",
  },
  {
    title: "Thiết bị văn phòng, máy in",
    iconChevron: false,
    iconMain: "fa-solid fa-print",
  },
  {
    title: "Máy tính bộ màn hình",
    iconChevron: false,
    iconMain: "fa-solid fa-laptop-code",
  },
  {
    title: "Tai nghe",
    iconChevron: false,
    iconMain: "fa-solid fa-cart-shopping",
  },
];

function Header() {
  const [currentMenu,setCurrentMenu] = useState(0);
  const dataUser = useSelector((state) => state.dataUser);
  const [hiddenCategory,setHiddenCategory] = useState(false);
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const handleClickTitleCategory = ()=>{
    setHiddenCategory(!hiddenCategory);
  }

  console.log(dataUser);

  return (
    <header className="header">
      <div className="header__top">
        <ul className="header__top__check">
          <li>
            <a href="#">Tìm kiếm</a>
          </li>
          <li>
            <a href="#">Kiểm tra đơn hàng</a>
          </li>
          <li>
            <a href="#">Liên hệ</a>
          </li>
        </ul>
      </div>

      <div className="header__inner">
        <div className="header__inner--logo">
          <img src="/src/assets/image/logo.jpg" />
        </div>
        <div className="header__inner--search">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>

        <div className="header__inner__right">
          <div className="header__inner__right--login">
            {dataUser.name ? (<a>{dataUser.name}</a>) : (<a href="/sign-in">ĐĂNG NHẬP/ĐĂNG KÍ</a>)}
          </div>
          <div className="header__inner__right--cart">
            <a href="#">
              <span>
                GIỎ HÀNG<Badge count={1} offset={[5,-6]}><i className="fa-solid fa-cart-shopping"></i></Badge>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="header__bottom__category">
          <h1 className="header__bottom__category--title" onClick={handleClickTitleCategory}>DANH MỤC SẢN PHẨM</h1>
          {hiddenCategory || categoryTech.map((category, index) => (
            <ItemCategory data={category} key={index} />
          ))}
        </div>
        <div className="header__bottom__menu">
          {menu.map((item,index)=>{
            return(
              <a key={index} href={item.href} style={index===currentMenu?{color:"#f57e20"}:{}}>{item.title}</a>
            )
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
