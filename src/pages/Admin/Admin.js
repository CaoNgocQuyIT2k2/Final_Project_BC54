import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { PieChartOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import DataCategory from './ManageCategories/DataCategory';

const { Header, Content, Footer, Sider } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
    setIsButtonClicked(false); 
  };

  const renderContent = () => {
    console.log('isButtonClicked:', isButtonClicked); 

    switch (selectedMenuItem) {
      case '1':
        return (
          <>
            <span style={{ margin: '18px 0px' }}></span>
            <DataCategory setIsButtonClicked={setIsButtonClicked} isButtonClicked={isButtonClicked} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ paddingTop: '60px' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      {/* <div className='flex' style={{
          alignItems: 'center',
          margin:'0 0 1rem 1rem'
        }}>
        <img  style={{
          marginRight:'0.5rem'
        }} className='w-12' src='/images/logo.png' alt="" />
        <span  className='text-white font-bold'>JIRA</span>
        </div> */}

        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedMenuItem]} mode="inline" onClick={handleMenuClick}>
          <Menu.Item icon={<HomeOutlined style={{
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }} />}>
            <a href="/home" onClick={() => window.location.href = "/home"}>Home</a>
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined style={{
            fontSize: '1.5rem',
          }} />} title="">
            User management
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} className="fixed">
        </Header>
        <Content style={{ padding: '64px 16px 0', margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#fff', 
              borderRadius: '8px',
              marginTop: '30px',
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
