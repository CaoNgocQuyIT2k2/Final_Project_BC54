import React, { useState } from 'react';
import { Button, Modal, Avatar } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'; // Import DeleteOutlined icon from antd
import TypeTask from './TypeTask';
import TaskDescription from './TaskDescription';
import TaskComment from './TaskComment';
import TaskName from './TaskName';
import TaskStatus from './TaskStatus';
import UpdateTask from '../TaskPage/UpdateTask';
import TaskListComment from './TaskListComment';

const { confirm } = Modal; // Destructure confirm method from Modal

const TaskDetail = () => {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };



  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        centered
        visible={open}
        onCancel={handleCancel}
        width={1000}
        footer={[
          
        ]}
      >
        <div style={{ display: 'flex' }}>
          <div className="comment" style={{ flex: 3,
            marginRight: '1rem' }}>
            <TypeTask   />
            <TaskName/>
            <TaskDescription/>
            <TaskComment/>
            <TaskListComment/>
          </div>
          <div  className="taskInfo " style={{ 
            flex: 2
          }}>
            <UpdateTask/>
          </div>
        </div>
      </Modal>
    </> 
  );
};

export default TaskDetail;
