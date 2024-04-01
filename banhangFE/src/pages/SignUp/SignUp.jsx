import React, { useState } from 'react';
import "./SignUp.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import * as UserService from "../../services/UserService";

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    remember: true 
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return UserService.signUpUser(data);
    },
  })

  const {data,isPending} = mutation;
  console.log(isPending,data)

  const handleSubmit = () => {
    console.log("Form data:", formData);
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    mutation.mutate({
      email,
      password,
      confirmPassword
    })
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
      autoComplete="off"
    >
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
        Tạo tài khoản
      </h1>
      <Form.Item
        label="Tài khoản"
        name="email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên đăng nhập!",
          },
        ]}
      >
        <Input name="email" value={formData.email} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
        ]}
      >
        <Input.Password name="password" value={formData.password} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu",
          },
        ]}
      >
        <Input.Password name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
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
        <Checkbox name="remember" checked={formData.remember} onChange={handleChange}>Remember</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <a href="/sign-in">Đã có tài khoản</a>
        <Button type="primary" htmlType="submit" style={(!formData.confirmPassword || !formData.password || !formData.email)?{backgroundColor: "grey"}:{backgroundColor: "blue"}}>
          Tạo tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
