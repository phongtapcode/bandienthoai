import { useEffect, useState } from "react";
import "./ProfilePage.scss";
import InputUpdate from "./components/InputUpdate/InputUpdate";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { setUserInfor } from "../../redux/action";
import { useDispatch } from "react-redux";

const dataInput = [
  {
    title: "Name",
    classIcon: "fa-solid fa-signature",
    name: "name",
  },
  {
    title: "Email",
    classIcon: "fa-regular fa-envelope",
    name: "email",
  },
  {
    title: "Phone",
    classIcon: "fa-solid fa-phone",
    name: "phone",
  },
  {
    title: "Address",
    classIcon: "fa-solid fa-location-dot",
    name: "address",
  },
];

function ProfilePage() {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.dataUser);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    avatar: dataUser.avatar || "",
    name: dataUser.name || "",
    email: dataUser.email || "",
    phone: dataUser.phone || "",
    address: dataUser.address || "",
  });

  useEffect(() => {
    if(dataUser?.id){
      handleGetDetailUser(dataUser.id,dataUser.access_token)
    }
    setUser({
      avatar: dataUser.avatar || "",
      name: dataUser.name || "",
      email: dataUser.email || "",
      phone: dataUser.phone || "",
      address: dataUser.address || "",
    });
  }, [dataUser]);


  const handleChangeInput = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdateUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await UserService.updateUser(dataUser.id, user);
    handleGetDetailUser(dataUser.id,dataUser.access_token)
    res?.status === "OK" ? message.success("Cập nhật thành công") : message.success("Cập nhật thất bại");
    setIsLoading(false);
  };

  const handleGetDetailUser = async (id, access_token) => {
    const res = await UserService.getDetailsUser(id, access_token);
    dispatch(setUserInfor({ ...res?.data, access_token: access_token }));
  };

  return (
    <form className="profile">
      {dataInput.map((item, index) => (
        <InputUpdate
          key={index}
          title={item.title}
          classIcon={item.classIcon}
          name={item.name}
          onChange={handleChangeInput}
          value={user[item.name]}
        />
      ))}
      <Loading isLoading={isLoading}>
        <button onClick={handleUpdateUser}>Cập nhật</button>
      </Loading>
    </form>
  );
}

export default ProfilePage;
