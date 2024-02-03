import React from 'react';
import { Collapse, Divider } from 'antd';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const TaskInfo = () => (
  <>
  
    <Collapse
      items={[
        {
          key: '1',
          label: 'This is default size panel header',
          children: <p>{text}</p>,
        },
      ]}
    />
  </>
);
export default TaskInfo;