import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { fetchAllPriority } from './GetApi';

const { Option } = Select;

const ListPriority = ({ onSelect, selectedPriorityId, defaultPriorityId }) => {
  const [priority, setPriority] = useState([]);
  
  useEffect(() => {
    fetchAllPriority(setPriority);
  }, []);
  
  // Cập nhật defaultPriorityId khi selectedPriorityId thay đổi
  useEffect(() => {
    if (defaultPriorityId !== null) {
      onSelect(defaultPriorityId);
    }
  }, [defaultPriorityId]);
  // useEffect sẽ chạy khi state priority thay đổi

  const handleCategorySelect = (projectId) => {
    if (typeof onSelect === 'function') {
      onSelect(projectId);
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
      value={selectedPriorityId || defaultPriorityId}
      filterOption={filterOption}
    >
      {priority.map(project => (
        <Option key={project.priorityId} value={project.priorityId}>
          {project.priority}
        </Option>
      ))}
    </Select>
  );
};

export default ListPriority;
