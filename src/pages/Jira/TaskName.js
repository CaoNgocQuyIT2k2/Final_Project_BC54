import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { fetchTaskDetail } from '../GetApi/GetApi';

const TaskName = () => {
  const [taskName, setTaskName] = useState('');
  const [editedTaskName, setEditedTaskName] = useState('');
  const [showSaveCancel, setShowSaveCancel] = useState(false);

  useEffect(() => {
    fetchTaskDetail(tasks => {
      if (tasks && tasks.taskName) {
        setTaskName(tasks.taskName);
      }
    });
  }, []);

  const handleTaskNameChange = e => {
    setEditedTaskName(e.target.value);
    setShowSaveCancel(true); // Hiển thị nút "tick" và "dấu x" khi người dùng bắt đầu chỉnh sửa
  };

  const handleSave = () => {
    // Perform save action here
    setTaskName(editedTaskName);
    setShowSaveCancel(false); // Ẩn nút "tick" và "dấu x" sau khi lưu
  };

  const handleCancel = () => {
    // Reset editedTaskName to original taskName
    setEditedTaskName(taskName);
    setShowSaveCancel(false); // Ẩn nút "tick" và "dấu x" khi hủy bỏ chỉnh sửa
  };

  return (
    <Form>
      <Form.Item style={{
        width: '80%',
      }} className='mt-2 text-2xl'>
        <Input.TextArea
        className='font-medium text-2xl'
          value={editedTaskName || taskName} 
          onChange={handleTaskNameChange} 
          onFocus={() => setShowSaveCancel(true)} // Hiển thị nút "tick" và "dấu x" khi ô input được focus
        />
      </Form.Item>
      {showSaveCancel && (
        <Form.Item>
          <Button  onClick={handleSave} style={{ marginRight: 8 }}>✓</Button>
          <Button onClick={handleCancel}>✗</Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default TaskName;
