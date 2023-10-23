import { Calendar, CalendarProps, Card, Divider, Space } from 'antd';
import { Dayjs } from 'dayjs';
import React from 'react';

const MyCalendarCard: React.FC = () => {
  const wrapperStyle: React.CSSProperties = {
    width: 300,
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <>
      <Card>
        <Space direction="horizontal" split={<Divider type="vertical" />}>
          <div style={wrapperStyle}>
            <Calendar fullscreen={false}  onPanelChange={onPanelChange} />
          </div>
        </Space>
      </Card>
    </>
  );
};

export default MyCalendarCard;
