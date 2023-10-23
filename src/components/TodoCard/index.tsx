import { Card, Result } from 'antd';
import React from 'react';

interface Props {
  title: string;
}

const TodoCard: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <Card title={title}>
      <Result status="403" title="页面暂未开放" />
    </Card>
  );
};

export default TodoCard;
