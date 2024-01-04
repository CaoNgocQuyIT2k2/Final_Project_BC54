import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import {https} from "../../service/config"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function FormLogin() {
  // let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    https
    .post("/api/Users/signin", values)
    .then((res) => {
        console.log(res)
        //chuyển hướng về trang chủ
        navigate("/home")
         // đảy data xuống localStorage để khi user load trang thì thông tin đăng nhập vẫn còn
         let dataJson = JSON.stringify(res.data.content)
         localStorage.setItem("USER_INFO", dataJson)
        window.location.reload()
        message.success("Đăng nhập thành công")

    }).catch((err) => {
        console.log(err)
        message.error("Đăng nhập thất bại")
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
          autoComplete="off"
        >
          <h1 className="text-6xl">Login</h1>
          <br />
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon p-7" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon p-7" />}
              type="passWord"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-theme p-7 mr-6">
              Log in
            </Button>
            Or <a className="text-2xl ml-3" href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
