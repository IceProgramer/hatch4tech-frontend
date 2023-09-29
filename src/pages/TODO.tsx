import { history } from '@@/core/history';
import { Button, Result } from 'antd';
import React from 'react';

const TODO: React.FC = () => {
  return (
    <Result
      status="404"
      title="程序员还在加班制作"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
};
export default TODO;
