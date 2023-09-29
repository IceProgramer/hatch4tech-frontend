import ProcessBadge from '@/components/ProcessBadge';
import { getActivityVOByIdUsingGET } from '@/services/hatch4tech-activity/activityController';
import { useParams } from '@@/exports';
import { ShareAltOutlined, StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Card, message, Space, Tooltip, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import { favourCompetitionUsingPOST } from "@/services/hatch4tech-competition/competitionFavourController";
import { favourActivityUsingPOST } from "@/services/hatch4tech-activity/activityFavourController";

const { Paragraph } = Typography;

const ActivityInfo: React.FC = () => {
  const [activity, setActivity] = useState<API.ActivityVO>();
  const [favourNum, setFavourNum] = useState<number>(activity?.favourNum ?? 0);
  const [hasFavour, setHasFavour] = useState<boolean>(activity?.hasFavour ?? false)
  const [loading, setLoading] = useState<boolean>(false);

  const params = useParams();

  // 获取活动信息
  const getActivity = async () => {
    try {
      if (params.id) {
        const id = parseInt(params.id);
        const res = await getActivityVOByIdUsingGET({ id });
        if (res.code === 0) {
          setActivity(res.data);
        }
      }
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const starActivity = async () => {
    // 收藏
    if (!hasFavour) {
      const activityFavourRequest: API.ActivityFavourRequest = {
        activityId: activity?.id
      }
      const res = await favourActivityUsingPOST(activityFavourRequest);
      if (res.code === 0) {
        setFavourNum(favourNum + 1);
        setHasFavour(true);
        message.success("收藏成功")
      }
    }
    // 取消收藏
    if (hasFavour) {
      const activityFavourRequest: API.ActivityFavourRequest = {
        activityId: activity?.id
      }
      const res = await favourActivityUsingPOST(activityFavourRequest);
      if (res.code === 0) {
        setFavourNum(favourNum - 1);
        setHasFavour(false);
        message.success("取消收藏成功")
      }
    }
  }


  useEffect(() => {
    getActivity();
  }, []);

  return (
    <>
      <Card
        style={{ margin: '0 150px' }}
        cover={<img alt={activity?.activityName} height={300} src={activity?.activityImg} />}
      >
        <Meta
          title={
            <ProDescriptions
              style={{ marginTop: '15px', width: '100%' }}
              column={1}
              title={
                <Space>
                  <span>{activity?.activityName}</span>
                  <Space.Compact block>
                    <Tooltip title={hasFavour ? '取消收藏' : '收藏'}>
                      <Button loading={loading} onClick={starActivity}>
                        {hasFavour ? <StarFilled /> : <StarOutlined />}
                        <span>{favourNum}</span>
                      </Button>
                    </Tooltip>
                    <Tooltip title="分享">
                      <Button icon={<ShareAltOutlined />} />
                    </Tooltip>
                  </Space.Compact>
                </Space>
              }
              size="small"
              dataSource={{
                competitionName: activity?.activityName,
                teamTime: (
                  <Space>
                    <div>{`${activity?.startTime} 到 ${activity?.endTime}`}</div>
                    <ProcessBadge startTime={activity?.startTime} endTime={activity?.endTime} />
                  </Space>
                ),
                competitionHost: activity?.activityHost,
                competitionDescript: (
                  <Paragraph style={{ width: '100%' }}>
                    <pre style={{ marginTop: 0 }}>{activity?.activityDescript}</pre>
                  </Paragraph>
                ),
              }}
              columns={[
                {
                  title: '竞赛名称',
                  key: 'text',
                  dataIndex: 'competitionName',
                },
                {
                  title: '起止时间',
                  dataIndex: 'teamTime',
                },
                {
                  title: '主办单位',
                  dataIndex: 'competitionHost',
                },
                {
                  title: '竞赛简介',
                  dataIndex: 'competitionDescript',
                },
              ]}
            />
          }
        />
      </Card>
    </>
  );
};

export default ActivityInfo;
