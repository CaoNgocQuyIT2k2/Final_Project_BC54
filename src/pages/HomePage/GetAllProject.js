import React, { useEffect, useState } from 'react'
import { https } from '../../service/config.js';
import { AudioOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input,  Button, Table, Tag, message, Avatar, Divider, Tooltip } from 'antd';
import { fetchAllProjects } from '../GetApi/GetApi.js';



export default function GetAllProject() {
  const [userArr, setUserArr] = useState([]);
  useEffect(() => {
    fetchAllProjects(setUserArr);
  }, []);

  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Project name',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (text) => {
        if (text && text.name === 'admin') {
          return <Tag color='red'>{text.name}</Tag>;
        } else {
          return <Tag color='green'>{text.name}</Tag>;
        }
      },
    },

    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
      render: (members) => {
        const visibleMembers = members.slice(0, 2); // Lấy tối đa 2 thành viên đầu tiên

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {members.map((member, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        style={{
                          backgroundColor: '#A9A9A9',
                        }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </Avatar>
                      {member.name}
                    </div>
                  ))}
                </div>
              }
              placement="topRight"
            >
              {members.length > 2 && (
                <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                  {visibleMembers.map((member, index) => (
                    <Tooltip key={index} title={member.name} placement="top">
                      <Avatar
                        style={{
                          backgroundColor: '#A9A9A9',
                        }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              )}
            </Tooltip>
            {members.length > 2 && (
              <Tooltip
                title={
                  <div style={{ alignItems: 'center' }}>
                    {members.slice(2).map((member, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', }}>
                        <Avatar
                          style={{
                            marginRight: '5px',
                            backgroundColor: '#A9A9A9',
                            color: 'white'
                          }}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </Avatar>
                        {member.name}
                      </div>
                    ))}
                  </div>
                }
                placement="topRight"
              >
                <Avatar
                  style={{
                    backgroundColor: '#FDE3CF',
                    color: 'black'
                  }}
                >
                  {`+${members.length - 2}`}
                </Avatar>
              </Tooltip>
            )}
            {members.length > 2 && <Divider type="vertical" />}
            {members.length === 0 && (
              <span style={{ color: '#999' }}>No members</span>
            )}
          </div>
        );
      },
    },


    {
      title: 'Actions',
      key: 'action',
      render: (_, user) => {
        return (
          <>
            <Button style={{
              marginRight: '0.5rem',
            }} onClick={() => handleEdit(user.taiKhoan)} className='bg-blue-500 text-white' type='primary'><EditOutlined /></Button>
            <Button onClick={() => handleDelete(user.taiKhoan)} className='bg-red-500 text-white' type='primary' danger><DeleteOutlined /></Button>
          </>
        );
      },
    },


  ];



  const handleDelete = (taiKhoan) => {
    https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
      .then((res) => {
        message.success("Xóa thành công")
        fetchAllProjects();
        console.log("🚀 ~ res:", res)
      }).catch((err) => {
        message.error(err.response.data.content)
      });
  }
  const handleEdit = (taiKhoan) => {
    https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
      .then((res) => {
        message.success("Xóa thành công")
        fetchAllProjects();
        console.log("🚀 ~ res:", res)
      }).catch((err) => {
        message.error(err.response.data.content)
      });
  }

  return (
    <div style={{
      padding: '0 3rem'
    }}>
      <Table columns={columns} dataSource={userArr} />
    </div>
  )
}

