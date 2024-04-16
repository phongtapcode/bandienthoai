import "./AdminPage.scss";
import { useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Header from "../../components/Header/Header";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminUser from "../../components/AdminUser/AdminUser";

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
  getItem("Product", "product", <DesktopOutlined />)
];

function AdminPage() {
    const [keySelected,setKeySelected] = useState(<AdminUser/>);

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
            default: return(<AdminUser/>)
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

