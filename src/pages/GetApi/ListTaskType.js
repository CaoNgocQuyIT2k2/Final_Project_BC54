import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { fetchAllTaskType } from './GetApi';

const { Option } = Select;

const ListTaskType = ({ onSelect, selectedTaskType,defaultTaskTypeId }) => {
  console.log("🚀 ~ defaultTaskTypeId:", defaultTaskTypeId)
  const [taskType, setTaskType] = useState([]);

  useEffect(() => {
    fetchAllTaskType(setTaskType);
  }, []); // useEffect sẽ chạy khi component được mount

  const handleCategorySelect = (value) => {
    // Check if onSelect is a function before calling it
    if (typeof onSelect === 'function') {
      onSelect(value);
    }
  };

// Function để lọc các option dựa trên giá trị nhập vào
const filterOption = (inputValue, option) => {
    const optionText = option.children || '';
    const textToCompare = typeof optionText === 'string' ? optionText : String(optionText);
    return textToCompare.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
  };
  
  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder="Please select priority"
      onChange={handleCategorySelect}
      value={selectedTaskType || defaultTaskTypeId}
      filterOption={filterOption}
    >
      {taskType.map(project => (
        <Option key={project.id} value={project.id}>
          {project.taskType}
        </Option>
      ))}
    </Select>
  );
};

export default ListTaskType;
