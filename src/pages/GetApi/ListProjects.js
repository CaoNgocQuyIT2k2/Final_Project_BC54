import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { fetchAllProjects } from './GetApi';

const { Option } = Select;


const ListProjects = ({ onSelect, selectedProjectId,defaultProjectId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchAllProjects(setProjects);
  }, []);

  const handleProjectSelect = (projectId) => {
    if (typeof onSelect === 'function') {
      onSelect(projectId);
    }
  };

  const filterOption = (inputValue, option) => {
    const optionText = option.children || '';
    const textToCompare =
      typeof optionText === 'string' ? optionText : String(optionText);
    return (
      textToCompare.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
    );
  };

  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder="Please select project"
      onChange={handleProjectSelect}
      value={selectedProjectId || defaultProjectId }
      filterOption={filterOption}
    >
      {projects.length > 0 &&
        projects.map((project) => (
          <Option key={project.id} value={project.id}>
            {project.projectName}
          </Option>
        ))}
    </Select>
  );
};

export default ListProjects;

