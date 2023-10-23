import { history } from '@@/core/history';
import { Button, Result } from 'antd';
import React from 'react';

const TODO: React.FC = () => {
  return (
    <Result
      status="403"
      title="页面暂未开放"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  );
};
export default TODO;
