import MyApplyCard from '@/components/MyApplyCard';
import MyCalendarCard from '@/components/MyCalendarCard';
import MyStarCard from '@/components/MyStarCard';
import MyTeamCard from '@/components/MyTeamCard';
import { getStudentInfoByIdUsingGET } from '@/services/hatch4tech-user/studentController';
import { useModel } from '@@/exports';
import { AuditOutlined, CalendarOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Card, Col, Row, Space, Tabs, TabsProps, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Title } = Typography;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (
      <span>
        <AuditOutlined />
        我的申请
      </span>
    ),
    children: <MyApplyCard />,
  },
  {
    key: '2',
    label: (
      <span>
        <TeamOutlined />
        我的队伍
      </span>
    ),
    children: <MyTeamCard />,
  },
  {
    key: '3',
    label: (
      <span>
        <CalendarOutlined />
        我的日程
      </span>
    ),
    children: <MyCalendarCard />,
  },
  {
    key: '4',
    label: (
      <span>
        <StarOutlined />
        我的收藏
      </span>
    ),
    children: <MyStarCard />,
  },
];

const MyApplication: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [userInfo, setUserInfo] = useState<API.StudentInfoVO>();

  const getStudentInfo = async () => {
    try {
      const id = currentUser?.userId;
      const res = await getStudentInfoByIdUsingGET({ id });
      if (res.code === 0) {
        setUserInfo(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudentInfo();
  }, []);

  return (
    <div className="userCenter">
      <Row style={{ marginTop: 10 }}>
        <Col span={4} offset={3}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={currentUser?.userAvatar} />}
          >
            <Meta title="个人信息" />
            <ProDescriptions
              style={{ marginTop: '15px' }}
              column={1}
              size="small"
              dataSource={{
                gender: userInfo?.gender,
                race: userInfo?.race,
                age: userInfo?.userAge + ' 岁',
                grade: userInfo?.studentGrade,
                politics: userInfo?.studentPolitics,
              }}
              columns={[
                {
                  title: '性别',
                  key: 'text',
                  dataIndex: 'gender',
                },
                {
                  title: '民族',
                  key: 'text',
                  dataIndex: 'race',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                },
                {
                  title: '年级',
                  dataIndex: 'grade',
                },
                {
                  title: '政治',
                  dataIndex: 'politics',
                },
              ]}
            />
          </Card>{' '}
        </Col>
        <Col span={14} offset={1} style={{ marginTop: '3%' }}>
          <Title style={{ color: 'white' }}>
            <Space>
              {currentUser?.userName}
            </Space>
          </Title>
          <Tabs items={items} />
        </Col>
      </Row>
    </div>
  );
};
export default MyApplication;
