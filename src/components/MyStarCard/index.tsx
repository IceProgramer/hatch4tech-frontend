import StarActivityCard from '@/components/MyStarCard/StarActivityCard';
import StarCompetitionCard from '@/components/MyStarCard/StarCompetitionCard';
import { Button, Card, Result, Select } from 'antd';
import React, { useState } from 'react';

const MyStarCard: React.FC = () => {
  const [selectValue, setSelectValue] = useState<string>('activity');

  const SelectList = () => {
    if (selectValue === 'activity') {
      return <StarActivityCard />;
    }
    if (selectValue === 'competition') {
      return <StarCompetitionCard />;
    }
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  };

  const handleChange = (value: string) => {
    setSelectValue(value);
  };

  return (
    <>
      <Card
        title="我的活动"
        // extra={
        //   <Select
        //     defaultValue="activity"
        //     style={{ width: 120 }}
        //     onChange={handleChange}
        //     options={[
        //       { value: 'activity', label: '我的活动' },
        //       { value: 'competition', label: '我的竞赛' },
        //     ]}
        //   />
        // }
      >
        <SelectList />
      </Card>
    </>
  );
};

export default MyStarCard;
