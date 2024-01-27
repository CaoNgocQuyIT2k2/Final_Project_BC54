import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { fetchAllStatus } from './GetApi';

const { Option } = Select;

const ListStatus = ({ onSelect, selectedStatusId, defaultStatusId }) => {
  const [status, setStatus] = useState([]);
  console.log("defaultStatusId-listprojects", defaultStatusId);

  useEffect(() => {
    fetchAllStatus(setStatus);
  }, []);
  
  // Cập nhật defaultStatusId khi selectedStatusId thay đổi
  useEffect(() => {
    if (defaultStatusId !== null) {
      onSelect(defaultStatusId);
    }
  }, [defaultStatusId]);
  

  const handleCategorySelect = (value) => {
    if (typeof onSelect === 'function') {
      onSelect(value);
    }
  };

  const filterOption = (inputValue, option) => {
    const optionText = option.children || '';
    const textToCompare = typeof optionText === 'string' ? optionText : String(optionText);
    return textToCompare.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
  };

  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder="Please select status"
      onChange={handleCategorySelect}
      value={selectedStatusId || defaultStatusId}  
      filterOption={filterOption}
    >
      {status.map(project => (
        <Option key={project.statusId} value={project.statusId}>
          {project.statusName}
        </Option>
      ))}
    </Select>
  );
};

export default ListStatus;
