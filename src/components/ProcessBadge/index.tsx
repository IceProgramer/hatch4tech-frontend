import { Badge } from 'antd';
import React from 'react';

interface Props {
  startTime: any;
  endTime: any;
}

const ProcessBadge: React.FC<Props> = (competitionTime: any) => {
  const startTime = new Date(competitionTime.startTime);
  const endTime = new Date(competitionTime.endTime);
  const currentTime = new Date();
  if (currentTime < startTime) {
    return <Badge status="default" text="未开始" />;
  }
  if (currentTime >= startTime && currentTime <= endTime) {
    return <Badge status="processing" text="进行中" />;
  }
  if (currentTime > endTime) {
    return <Badge status="error" text="已结束" />;
  }
  return null;
};

export default ProcessBadge;
