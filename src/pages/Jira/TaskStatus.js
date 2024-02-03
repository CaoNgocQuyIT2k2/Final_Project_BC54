import React, { useState } from 'react';
import { Select, Space, Avatar, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const provinceData = ['Back Log', 'Selected For Development', 'In Progress', 'Done'];
const cityData = {
  taskType: ['Back Log', 'Selected For Development', 'In Progress', 'Done'],
};

const TaskStatus = () => {
  const [cities, setCities] = useState(cityData[provinceData[0]]);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
  };

  const handleDelete = () => {
    confirm({
      title: 'Are you sure you want to delete this task?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Handle delete action here
        console.log('Task deleted');
      },
      onCancel() {
        // Do nothing
      },
    });
  };

  return (
    <Space wrap style={{ display: 'flex', alignItems: 'center' }}>
       <span className="ant-typography pl-1">
        <strong>Status</strong>
      </span>
      <Select
        title='Status'
        defaultValue={provinceData[0]}
        style={{ minWidth: '100px' }} // Đặt độ rộng tối thiểu cho Select
        onChange={handleProvinceChange}
        options={provinceData.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <div > 
        <Avatar style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} onClick={handleDelete} />
      </div>
    </Space>
  );
};

export default TaskStatus;
