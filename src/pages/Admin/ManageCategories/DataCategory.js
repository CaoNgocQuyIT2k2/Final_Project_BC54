import React, { useEffect, useState } from 'react';
import { https } from '../../../service/config.js';
import { Button, Table,  message } from 'antd';
import EditUser from './EditUser.js';
import {  DeleteOutlined } from '@ant-design/icons';
import AddUser from './AddUser.js';
import { Modal } from 'antd';

export default function DataCategory({ setIsButtonClicked, isButtonClicked }) {
  const [detail, setDetail] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchAllUser = async () => {
    try {
      const response = await https.get(`/api/Users/getUser`);
      const categories = response.data.content || [];
      console.log("🚀 ~ response.data:", response.data.content);
      setDetail(categories);
    } catch (error) {
      console.error("Error fetching article detail:", error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const showModal = (categories) => {
    setSelectedCategoryId(categories.userId);
  };

  const handleAddUserCallback = () => {
    fetchAllUser();
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, categories) => (
        <div className='flex'>
          <EditUser
            showModal={showModal}
            userId={categories.userId}
            name={categories.name}
            email={categories.email}
            phoneNumber={categories.phoneNumber}
            fetchAllUser={fetchAllUser}
          />
          <Button onClick={() => handleDelete(categories.userId)} className='bg-red-500 text-white ml-2'  type='primary'>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (userId) => {
    Modal.confirm({
      title: 'Confirm deletion',
      content: 'Are you sure you want to delete this user?',
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: {
        className: 'bg-red-500',
      },
      onOk: () => {
        https
          .delete(`/api/Users/deleteUser?id=${userId}`)
          .then((res) => {
            message.success('Xóa thành công');
            fetchAllUser();
          })
          .catch((err) => {
            message.error('Xóa thất bại');
            message.error(err.response.data);
          });
      },
      onCancel: () => {
        // Do nothing if the user cancels the deletion
      },
    });
  }

  return (
    <div>
       <AddUser showModal={showModal}  fetchAllUser={fetchAllUser} onAddUser={handleAddUserCallback} />
      <Table className='font-medium' columns={columns} dataSource={detail} />
    </div>
  );
}
