import ProcessBadge from '@/components/ProcessBadge';
import { favourActivityUsingPOST } from '@/services/hatch4tech-activity/activityFavourController';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Card, message, Space, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';

const { Paragraph } = Typography;

interface Props {
  activity: API.ActivityVO;
}

const ActivityDetailCard: React.FC<Props> = (props) => {
  const { activity } = props;
  const [hasFavour, setHasFavour] = useState<boolean>(activity?.hasFavour ?? false);
  const [loading, setLoading] = useState<boolean>(false);

  const signActivity = async () => {
    setLoading(true);
    try {
      const favourActivityRequest: API.ActivityFavourRequest = {
        activityId: activity.id,
      };
      const res = await favourActivityUsingPOST(favourActivityRequest);
      if (res.code === 0) {
        message.success('报名成功');
        setHasFavour(true);
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Card
      style={{ width: '90%' }}
      cover={<img alt={activity?.activityName} height={300} src={activity?.activityImg} />}
    >
      <Meta
        title={
          <ProDescriptions
            style={{ marginTop: '15px', width: '100%' }}
            column={1}
            title={
              <Space size={10}>
                <span>{activity?.activityName}</span>
                {activity.activityStatus === 0 ? (
                  <Button
                    type="primary"
                    loading={loading}
                    disabled={hasFavour}
                    onClick={signActivity}
                  >
                    {!hasFavour ? '报名活动' : '活动已报名'}
                  </Button>
                ) : (
                  <Button type="primary" disabled>
                    活动已结束
                  </Button>
                )}
              </Space>
            }
            size="small"
            dataSource={{
              activityName: activity?.activityName,
              activityTime: (
                <Space>
                  <div>{`${activity?.startTime} 到 ${activity?.endTime}`}</div>
                  <ProcessBadge startTime={activity?.startTime} endTime={activity?.endTime} />
                </Space>
              ),
              activityHost: activity?.activityHost,
              activityAddress: activity?.activityAddress,
              activityReward: `${activity?.rewardNum} ${activity?.rewardType}`,
              activityDescript: (
                <Paragraph style={{ width: '100%' }}>
                  <pre style={{ marginTop: 0 }}>{activity?.activityDescript}</pre>
                </Paragraph>
              ),
            }}
            columns={[
              {
                title: '活动名称',
                key: 'text',
                dataIndex: 'activityName',
              },
              {
                title: '起止时间',
                dataIndex: 'activityTime',
              },
              {
                title: '主办单位',
                dataIndex: 'activityHost',
              },
              {
                title: '活动地点',
                dataIndex: 'activityAddress',
              },
              {
                title: '活动奖励',
                dataIndex: 'activityReward',
              },
              {
                title: '活动简介',
                dataIndex: 'activityDescript',
              },
            ]}
          />
        }
      />
    </Card>
  );
};

export default ActivityDetailCard;
