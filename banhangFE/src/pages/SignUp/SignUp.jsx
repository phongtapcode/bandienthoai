import "./SignUp.scss";
import { Button, Checkbox, Form, Input } from "antd";

function SignUp() {
  const onFinish = (values) => {
    console.log("Success:", values);
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
        Tạo tài khoản
      </h1>
      <Form.Item
        label="Tài khoản"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
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
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Nhập lại mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng lại nhập mật khẩu",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <a href="/sign-in">Đã có tài khoản</a>
        <Button type="primary" htmlType="submit">
          Tạo tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
