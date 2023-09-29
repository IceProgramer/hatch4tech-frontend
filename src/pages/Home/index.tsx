import { ArrowRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import './index.less';

const Home: React.FC = () => {
  return (
    <>
      <div className="home">
        <a href='/timeline/index.html'>
        <button type="button" className="welcomeButton">
          <Space>
            开启科技创新之旅
            <ArrowRightOutlined />
          </Space>
        </button></a>
      </div>
    </>
  );
};

export default Home;
