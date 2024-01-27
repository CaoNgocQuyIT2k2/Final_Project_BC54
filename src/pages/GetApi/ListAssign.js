import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { fetchAllAssigness } from './GetApi';

const { Option } = Select;

const ListAssign = ({ projectId, onSelect, selectedAssign, defaultAssigness }) => {
  console.log("🚀 ~ projectIdin listAssign:", projectId)
  const [assign, setAssign] = useState([]);

  useEffect(() => {
    fetchAllAssigness(projectId, setAssign);
  }, [projectId]);

const handleCategorySelect = (values) => {
  const sanitizedValues = values || []; // Nếu values là null thì thay thế bằng một mảng trống
  if (typeof onSelect === 'function') {
    onSelect(sanitizedValues);
  }
};


  const filterOption = (inputValue, option) => {
    const optionText = option.children || '';
    const textToCompare =
      typeof optionText === 'string' ? optionText : String(optionText);
    return textToCompare.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
  };

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select assignees"
      onChange={handleCategorySelect}
      value={selectedAssign || defaultAssigness}
      filterOption={filterOption}
    >
      {Array.isArray(assign) && assign.length > 0 ? (
        assign.map((user) => (
          <Option key={user.userId} value={user.userId}>
            {user.name}
          </Option>
        ))
      ) : (
        <Option value={null} disabled>
          No assignees available
        </Option>
      )}
    </Select>
  );
};

export default ListAssign;
