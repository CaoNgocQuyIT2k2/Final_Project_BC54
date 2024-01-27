//  chỉnh sửa về phần quản lí user

import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message } from 'antd';
import { https } from '../../../service/config.js';
import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

const EditUser = ({ showModal, userId, name, fetchAllUser, email, phoneNumber }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    email: '',
    name: '',
    phoneNumber: '',
    passWord: '', // Add the passWord field
  });

  useEffect(() => {
    setUserData({
      userId,
      name,
      email,
      phoneNumber,
      passWord: '', // Set the initial value for the passWord field
    });
  }, [userId, name, email, phoneNumber]);

  const showModalHandler = () => {
    showModal({ userId: userData.userId, name: userData.name, email: userData.email, phoneNumber: userData.phoneNumber });
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e, field) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: e.target.value,
    }));
  };

  const handleEditUser = async () => {
    try {
      const response = await https.put(`/api/Users/editUser`, {
        id: userData.userId,
        passWord: userData.passWord,
        email: userData.email,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
      });

      const updatedUser = response.data || {};
      console.log("🚀 ~ updatedUser:", updatedUser);
      message.success("Cập nhật người dùng thành công");
      fetchAllUser();
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Cập nhật người dùng thất bại");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModalHandler} className='bg-yellow-500 text-white'>
        <EditOutlined />
      </Button>
      <AntModal
        visible={open}
        title="Chỉnh sửa người dùng"
        onOk={handleEditUser}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Trở về
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handleEditUser}>
            Chỉnh sửa
          </Button>,
        ]}
      >
        <label htmlFor="userId">Id:</label>
        <Input style={{ marginBottom: '15px' }} value={userData.userId} onChange={(e) => handleChange(e, 'userId')} disabled   />
        <label htmlFor="email">Email:</label>
        <Input style={{ marginBottom: '15px' }} value={userData.email} onChange={(e) => handleChange(e, 'email')} />
        <label htmlFor="name">Name:</label>
        <Input style={{ marginBottom: '15px' }} value={userData.name} onChange={(e) => handleChange(e, 'name')} />
        <label htmlFor="passWord">Password:</label>
        <Input.Password
          style={{ marginBottom: '15px' }}
          value={userData.passWord}
          onChange={(e) => handleChange(e, 'passWord')}
        />
        <label htmlFor="phoneNumber">Phone:</label>
        <Input style={{ marginBottom: '15px' }} value={userData.phoneNumber} onChange={(e) => handleChange(e, 'phoneNumber')} />
      </AntModal>
    </>
  );
};

export default EditUser;
