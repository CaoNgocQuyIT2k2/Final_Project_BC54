import React, { useState } from 'react';
import { Button, Modal as AntModal, Input } from 'antd'; // Rename Modal to AntModal to avoid naming conflict

const CustomModal = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
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

  return (
    <>
      <Button type="primary" onClick={showModal} className='bg-green-500 text-white'>
        Add 
      </Button>
      <AntModal
        visible={open} // Fix typo 'open' to 'visible'
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
          <Input/>
      </AntModal>
    </>
  );
};

export default CustomModal; // Export with the new name
