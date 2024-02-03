import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import ReactQuill from 'react-quill';

export default function TaskDescription({ content, handleContentChange }) {
  const [showDescription, setShowDescription] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(true);
  };

  const handleCancelDescription = () => {
    setShowDescription(false);
  };

  const handleSaveDescription = () => {
    // Thực hiện lưu nội dung mô tả
    setShowDescription(false);
  };

  return (
    <div className="description-container mb-6">
      <span className="ant-typography pl-1">
        <strong>Description</strong>
      </span>
      {!showDescription && (
        <div
          className="p-1 hover:bg-gray-200 duration-300 rounded custom-html-parser"
          onClick={handleShowDescription}
        >
          <span className="ant-typography ant-typography-secondary">Add a description...</span>
        </div>
      )}
      {showDescription && (
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please fill description" }]}
        >
          <ReactQuill
            style={{ height: '200px' }}
            value={content}
            onChange={handleContentChange}
          />
          <div style={{ marginTop: '3rem' }}>
            <Button
              type="default"
              className='bg-blue-500 text-white'
              onMouseOver={(e) => e.target.style.color = 'black'}
              onMouseOut={(e) => e.target.style.color = 'white'}
              onClick={handleSaveDescription}
              style={{ marginRight: '8px' }}
            >
              Save
            </Button>
            <Button onClick={handleCancelDescription}>Cancel</Button>
          </div>
        </Form.Item>
      )}
    </div>
  );
}
