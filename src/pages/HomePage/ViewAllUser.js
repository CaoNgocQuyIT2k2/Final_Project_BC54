import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Button, message } from "antd";
import { https } from "../../service/config";

export default function ViewAllUser() {
  const [userArr, setUserArr] = useState([]);
  const [editUserData, setEditUserData] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    console.log("Đang lấy dữ liệu người dùng...")
    fetchAllUser();
  }, []);

  const showEditModal = (user) => {
    setEditUserData(user);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleEditSubmit = async (values) => {
    try {
      // Gửi request cập nhật thông tin người dùng lên server
      // Ví dụ: const response = await https.put(`/api/Users/editUser/${editUserData.userId}`, values);

      setIsEditModalVisible(false);
      setEditUserData(null);
      fetchAllUser();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = (id) => {
    console.log("Đang xoá người dùng với ID:", id);
    https.delete(`/api/Users/deleteUser?id=${id}`)
      .then((res) => {
        console.log("Phản hồi từ API:", res);
        message.success("Xoá thành công");
        // You may also want to fetch updated user data here
        fetchAllUser();
      }).catch((err) => {
        console.log(err);
        message.error("Xoá thất bại");
      });
  };
  

  const columns = [
    { title: "No.", dataIndex: "number", render: (_, __, index) => index + 1 },
    { title: "Name", dataIndex: "name", render: (text) => <a>{text}</a> },
    { title: "User ID", dataIndex: "userId" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phoneNumber" },
    
  ];

  const fetchAllUser = async () => {
    try {
      const response = await https.get("/api/Users/getUser");
      setUserArr(response.data.content || []);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  return (
    <div style={{ padding: "100px 5rem", backgroundColor: "#cbd5e1" }}>
      <Table columns={columns} dataSource={userArr} />

      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <EditForm initialValues={editUserData} onSubmit={handleEditSubmit} />
      </Modal>
    </div>
  );
}

const EditForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <div className="formEdit">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phoneNumber"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password Confirmation"
          name="rePassword"
          rules={[{ required: true, message: "Please enter Password" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="btn-theme" type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => oncancel()} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
