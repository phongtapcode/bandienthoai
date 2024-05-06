import "./Header.scss";
import { Input,Badge, Avatar,Popover } from "antd";
import ItemCategory from "./components/ItemCategory/ItemCategory";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { resetUser,valueSearch } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Loading from "../Loading/Loading";
import * as UserService from "../../services/UserService";
import categoryPhone from "../../assets/category";

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
    href: "/products",
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
    children: categoryPhone.map((category)=>({name: category,href: "/products"})),
    iconChevron: true,
    iconMain: "fa-solid fa-mobile-screen-button",
  },
  // {
  //   title: "Laptop",
  //   children: [
  //     { name: "Macbook", href: "#" },
  //     { name: "Laptop Dell", href: "#" },
  //     { name: "Laptop HP", href: "#" },
  //     { name: "Laptop Asus", href: "#" },
  //   ],
  //   iconChevron: true,
  //   iconMain: "fa-solid fa-laptop",
  // },
  // {
  //   title: "Tablet",
  //   children: [
  //     { name: "Talet Ipad", href: "#" },
  //     { name: "Tablet Beneve", href: "#" },
  //     { name: "Tablet Itel", href: "#" },
  //     { name: "Tablet Kindle", href: "#" },
  //     { name: "Tablet Samsung", href: "#" },
  //   ],
  //   iconChevron: true,
  //   iconMain: "fa-solid fa-tablet",
  // },
  // {
  //   title: "Phụ kiện",
  //   children: [
  //     { name: "Bao da ốp lưng", href: "#" },
  //     { name: "Loa", href: "#" },
  //     { name: "Sạc", href: "#" },
  //     { name: "Tai nghe", href: "#" },
  //     { name: "Cường lực", href: "#" },
  //   ],
  //   iconChevron: true,
  //   iconMain: "fa-solid fa-headphones",
  // },
  // {
  //   title: "Smart Watch",
  //   iconChevron: false,
  //   iconMain: "fa-regular fa-clock",
  // },
  // {
  //   title: "Apple Watch",
  //   iconChevron: false,
  //   iconMain: "fa-solid fa-mobile-button",
  // },
  // {
  //   title: "Thiết bị văn phòng, máy in",
  //   iconChevron: false,
  //   iconMain: "fa-solid fa-print",
  // },
  // {
  //   title: "Máy tính bộ màn hình",
  //   iconChevron: false,
  //   iconMain: "fa-solid fa-laptop-code",
  // },
  // {
  //   title: "Tai nghe",
  //   iconChevron: false,
  //   iconMain: "fa-solid fa-cart-shopping",
  // },
];

function Header({ isHiddenItemHeader = false }) {
  const [currentMenu, setCurrentMenu] = useState(0);
  const orderProducts = useSelector((state) => state.orderProduct);
  const valueInput = useSelector((state) => state.valueSearch);
  const dataUser = useSelector((state) => state.dataUser);
  const [hiddenCategory, setHiddenCategory] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearch = (value) => {
    dispatch(valueSearch(value));
  }

  const handleClickTitleCategory = () => {
    setHiddenCategory(!hiddenCategory);
  };

  const handleLogout = async () => {
    setLoadingLogout(true);
    localStorage.removeItem("access_token");
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoadingLogout(false);
    // navigate("/sign-in")
  };

  const content = (
    <div>
      <p
        onClick={() => {
          navigate("/profile");
        }}
      >
        Thông tin
      </p>
      <p
        onClick={() => {
          navigate("/my-order");
        }}
      >
        Đơn hàng của tôi
      </p>
      {dataUser?.isAdmin && (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/system/admin")}
        >
          Quản lí hệ thống
        </p>
      )}
      <p style={{ cursor: "pointer" }} onClick={handleLogout}>
        Đăng xuất
      </p>
    </div>
  );

  const onChangeSearch = (e) => {
    dispatch(valueSearch(e.target.value));
  }

  return (
    <header className="header">
      {!isHiddenItemHeader && (
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
      )}

      <div className="header__inner">
        <div className="header__inner--logo">
          <img src="/src/assets/image/logo.jpg" />
        </div>
        {!isHiddenItemHeader && (
          <div className="header__inner--search">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              value={valueInput}
              size="large"
              onChange={onChangeSearch}
              onSearch={onSearch}
            />
          </div>
        )}

        <div className="header__inner__right">
          <div className="header__inner__right--login">
            <Loading isLoading={loadingLogout}>
              <Popover content={content} trigger="click">
                {dataUser.name ? (
                  <>
                    {dataUser.avatar ? (
                      <div className="user-info">
                        <img
                          src={dataUser.avatar}
                          alt="Avatar"
                          className="avatar"
                        />
                        <a style={{ cursor: "pointer" }}>{dataUser.name}</a>
                      </div>
                    ) : (
                      <div className="user-info">
                        <Avatar size="large" icon={<UserOutlined />} />
                        <a style={{ cursor: "pointer" }}>{dataUser.name}</a>
                      </div>
                    )}
                  </>
                ) : (
                  <a href="/sign-in">ĐĂNG NHẬP/ĐĂNG KÍ</a>
                )}
              </Popover>
            </Loading>
          </div>

          {!isHiddenItemHeader && (
            <div className="header__inner__right--cart">
              <a href="/order">
                <span>
                  GIỎ HÀNG
                  <Badge count={orderProducts?.orderItems?.length} offset={[5, -6]}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Badge>
                </span>
              </a>
            </div>
          )}
        </div>
      </div>

      {!isHiddenItemHeader && (
        <div className="header__bottom">
          <div className="header__bottom__category">
            <h1
              className="header__bottom__category--title"
              onClick={handleClickTitleCategory}
            >
              DANH MỤC SẢN PHẨM
            </h1>
            {hiddenCategory ||
              categoryTech.map((category, index) => (
                <ItemCategory data={category} key={index} />
              ))}
          </div>
          <div className="header__bottom__menu">
            {menu.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.href}
                  style={index === currentMenu ? { color: "#f57e20" } : {}}
                >
                  {item.title}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
