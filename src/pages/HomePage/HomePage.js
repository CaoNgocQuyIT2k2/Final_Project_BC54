import React from 'react';
import {  Layout, theme, Dropdown, Space, Menu, Button } from 'antd';
import GetAllProject from './GetAllProject';
import Search from 'antd/es/input/Search';
const {Content } = Layout;



const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <Layout>
      <Content style={{
        marginTop: '4rem',
      }}>
        <div style={{
          padding: '1rem 3rem'

        }} >
          <div className='flex mb-5'>
            <h1 className='text-2xl font-medium'>Projects</h1>
            <Button type='primary' className='bg-blue-700 ml-auto font-medium'>Create project</Button>
          </div>
          <Space direction="vertical">
            <Search
              placeholder=""
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
        <Layout>
          <Content>
            <GetAllProject />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default HomePage;