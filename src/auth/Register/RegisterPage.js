import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { https } from "../../service/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  let navigate = useNavigate();
  const onFinish = (e) => {
    https
      .post("/api/Users/signup", e)
      .then((res) => {
        console.log(res);
        message.success("Đăng ký thành công");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        message.error("Đăng ký thất bại");
      });
  };

  return (
    <div className="flex ">
      <div className="bg-cover relative w-1/2 ">
        <h2 className="absolute top-10 left-20 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold ">
          JIRA
        </h2>

        <img
          className=" h-screen w-screen object-cover rounded-r-3xl "
          src="/img_web/pexels-pavel-danilyuk-5496464.jpg"
          alt=""
        />
      </div>
      <div className="flex items-center justify-center  w-screen">
        {/* <div className="absolute top-0 left-0 h-full w-full bg-rose-700"></div> */}

        <Form
          name="normal_login"
          className="login-form"
          style={{
            width: 700,
            height: 700,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h1 className="text-6xl">Sign up</h1>
          <br />
          {/*------------------------------------------------ Email ---------------------------------------------------------- */}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon p-7" />}
              placeholder="Email"
            />
          </Form.Item>
          {/*------------------------------------------------ Name ---------------------------------------------------------- */}
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          > 
            <Input 
            prefix={<UserOutlined className="site-form-item-icon p-7"/>}
             placeholder="Name" />
          </Form.Item>
          {/*------------------------------------------------ Phone number ---------------------------------------------------------- */}
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >   
            <Input 
            prefix={<PhoneOutlined className="site-form-item-icon p-7"/>} 
            placeholder="Phone Number"  />
          </Form.Item>
          {/*------------------------------------------------ Password ---------------------------------------------------------- */}
          <Form.Item
            name="passWord"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon p-7" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/*------------------------------------------------ Re-password ---------------------------------------------------------- */}
          <Form.Item
            name="re_password"
            rules={[
              {
                required: true,
                message: "Please re-enter your password",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon p-7" />}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-theme p-7 mr-6"
            >
              Register
            </Button>
            Or{" "}
            <a className="text-2xl ml-3" href="/login">
              Login now!
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
