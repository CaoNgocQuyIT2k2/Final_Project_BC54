import React, { useState } from 'react';
import { Select, Space } from 'antd';
const provinceData = ['Bug','Task'];
const cityData = {
  taskType: ['Bug','Task'],
};
const TypeTask = () => {
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
  };
  return (
    <Space wrap>
      <Select
        defaultValue={provinceData[0]}
        style={{
          width: 120,
        }}
        onChange={handleProvinceChange}
        options={provinceData.map((province) => ({
          label: province,
          value: province,
        }))}
      />
    </Space>
  );
};
export default TypeTask;