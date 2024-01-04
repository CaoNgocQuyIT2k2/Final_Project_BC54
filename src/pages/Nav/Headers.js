import React from 'react';
import { AuditOutlined, DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, theme, Dropdown, Space, Menu, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/action/logout';

const { Header } = Layout;

const items = [
  {
    label: (
      <Link to='/home'>
        View all projects
      </Link>
    ),
    key: '0',
  },
  {
    label: (
      <Link to='/'>
        Create project
      </Link>
    ),
    key: '1',
  },
];
const item1 = [
  {
    label: (
      <Link to='/'>
     View all users
    </Link>
    ),
    key: '0',
  },
];

const Headers = () => {
  let user = useSelector((state) => state.userReducer.user);
  let dispatch = useDispatch();

  const handleMenuClick = (e) => {
    console.log("click", e);
    if (e.key === "1") {
      window.location.href = "/";
    }
    // Check if the key is '2' (Log out)
    if (e.key === "2") {
      window.location.reload();
      message.success("Đăng xuất thành công");
      // Perform the logout action
      window.location.href = "/";
      // Clear data user and reset state userReducer
      localStorage.removeItem("USER_INFO");
      dispatch(logoutUser());
      return;
    }
  };

  const menuProps = [
    {
      label: (
        <a
          style={{ padding: '0 20px' }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          onClick={() => handleMenuClick({ key: '1' })}
        >
          <AuditOutlined className='mr-1' /> Profile
        </a>
      ),
      key: '1',
      icon: <AuditOutlined />,
    },
    {
      label: (
        <a
          style={{ padding: '0 20px' }}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleMenuClick({ key: '2' })}
        >
          <LogoutOutlined className='mr-1' />
          Log Out
        </a>
      ),
      key: '2',
      icon: <LogoutOutlined />,
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'fixed',
        zIndex: 1000,
        width: '100%',
      }}
      className='h-14 bg-white shadow px-4 fixed left-0 top-0 w-full z-header'
    >
      <div className="demo-logo">
        <img className='w-12' src='/images/logo.png' alt="" />
      </div>
      <h1 className='text-slate-700 font-bold ml-1 mr-5'>JIRA</h1>

      <div className='flex justify-between items-end w-full'>
        <div className='text-blue-500 font-medium'>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()} className="ml-4">
              <Space>
                Projects
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={<Menu>{item1.map(item => <Menu.Item key={item.key}>{item.label}</Menu.Item>)}</Menu>}>
            <a onClick={(e) => e.preventDefault()} className="ml-4">
              <Space>
                Users
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={<></>}>
            <a onClick={(e) => e.preventDefault()} className="ml-4">
              <Space>
                Create task
              </Space>
            </a>
          </Dropdown>
        </div>
        <div>
          <Space wrap>
            <Link><SettingOutlined style={{ fontSize: '1.5rem', verticalAlign: 'middle' }} /></Link>
            <Dropdown.Button
              overlay={<Menu>{menuProps.map(item => <Menu.Item key={item.key}>{item.label}</Menu.Item>)}</Menu>}
              placement="bottom"
              icon={<UserOutlined />}
              className='p-3'
            >
              {user.name}
            </Dropdown.Button>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default Headers;