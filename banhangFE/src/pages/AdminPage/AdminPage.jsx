import "./AdminPage.scss";
import { useState } from "react";
import {
  ShoppingCartOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Header from "../../components/Header/Header";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminOrder from "../../components/AdminOrder/AdminOrder";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("User", "user", <PieChartOutlined />),
  getItem("Product", "product", <DesktopOutlined />),
  getItem("Cart", "cart", <ShoppingCartOutlined />),
];

function AdminPage() {
    const [keySelected,setKeySelected] = useState(<AdminProduct/>);

    const handleClickSidebar = ({key}) => {
        setKeySelected(renderPage(key));
    }

    const renderPage = (key) => {
        switch(key) {
            case 'user':
                return(
                    <AdminUser/>
                )
            case 'product':
                return(
                    <AdminProduct/>
                )
            case 'cart':
              return(
                  <AdminOrder/>
              )
            default: return(<h1>Admin</h1>)
        }
    }

  return (
    <>
    <Header isHiddenItemHeader/>
    <div className="adminpage">
      <div className="adminpage__sidebar" style={{ width: "256px" }}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          onClick={handleClickSidebar}
        />
      </div>
      <div className="adminpage__content">
        {keySelected}
      </div>
    </div>
    </>
  );
}

export default AdminPage;

