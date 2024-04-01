import { useState } from 'react';
import "./SignIn.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import * as UserService from "../../services/UserService";

function SignIn() {
  const [validate,setValidate] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return UserService.loginUser(data);
    },
  })

const {data,isPending} = mutation;
console.log(isPending,data)

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = () => {
    // e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    
    mutation.mutate({
      email,
      password
    })
    // setValidate(formData.confirmPassword !== formData.password ? "Mật khẩu xác nhận chưa đúng":"");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 1000,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}>Đăng nhập</h1>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email",
          },
        ]}
      >
        <Input name="email" value={formData.email} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
        ]}
      >
        <Input.Password name="password" value={formData.password} onChange={handleChange} />
      </Form.Item>
      
      {data?.status === "ERR" && <div style={{width: "100%",textAlign: "center"}}>{data?.message}</div>}
      
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox name="remember" checked={formData.remember} onChange={handleChange}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <a href="/sign-up">Bạn chưa có tài khoản</a>
        <div style={{color: 'red'}}>{validate}</div>

        <Loading isLoading={isPending}>
        <Button type="primary" htmlType="submit" style={(!formData.password || !formData.email)?{backgroundColor: "grey"}:{backgroundColor: "blue"}}>
          Đăng nhập
        </Button>
        </Loading>

      </Form.Item>
    </Form>
  );
}

export default SignIn;
