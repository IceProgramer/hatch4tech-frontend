import ActivityDetailCard from '@/components/ActivityCard/ActivityDetailCard';
import ActivitySignCard from '@/components/ActivityCard/ActivitySignCard';
import { getActivityVOByIdUsingGET } from '@/services/hatch4tech-activity/activityController';
import { useParams } from '@@/exports';
import { NotificationTwoTone, ProjectTwoTone } from '@ant-design/icons';
import { Col, message, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const ActivityInfo: React.FC = () => {
  const [activity, setActivity] = useState<API.ActivityVO>();

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

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <>
      {activity ? (
        <div className="activityInfo">
          <Row>
            <Col offset={2} style={{ width: '100%', height: 100 }}>
              <Tabs
                size="large"
                tabPosition="left"
                items={[
                  {
                    key: '1',
                    label: (
                      <span>
                        <ProjectTwoTone /> 活动通知
                      </span>
                    ),
                    children: <ActivityDetailCard activity={activity} />,
                  },
                  {
                    key: '2',
                    label: (
                      <span>
                        <NotificationTwoTone />
                        结果公示
                      </span>
                    ),
                    children: <ActivitySignCard activity={activity} />,
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default ActivityInfo;
