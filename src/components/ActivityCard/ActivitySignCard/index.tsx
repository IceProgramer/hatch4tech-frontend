import { getSignUserListUsingGET } from '@/services/hatch4tech-activity/activityFavourController';
import { history } from '@@/core/history';
import { Button,Card,Result,Table,Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React,{ useEffect,useState } from 'react';

const { Paragraph, Title } = Typography;

interface Props {
  activity: API.ActivityVO;
}

interface DataType {
  // key: React.Key;
  studentName: string;
  studentNumber: string;
}

const ActivitySignCard: React.FC<Props> = (props) => {
  const { activity } = props;

  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'studentName',
      width: 150,
    },
    {
      title: '学号',
      dataIndex: 'studentNumber',
      width: 150,
    },
  ];

  const [activitySignList, setActivitySignList] = useState<DataType[]>();

  const getActivitySighList = async () => {
    try {
      const id = activity.id;
      const res = await getSignUserListUsingGET({ id });
      if (res.data) {
        const dataList: DataType[] = res.data.map((student) => ({
          // key: (student.userId ?? '') as React.Key,
          studentName: student.studentName ?? '',
          studentNumber: student.studentNumber ?? '',
        }));
        setActivitySignList(dataList);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(activity.activityStatus)
    if (activity.activityStatus === 1) {
      getActivitySighList();
    }
  }, []);
  return activity ? (
    <Card>
      {activity.activityStatus === 1 ? (
        <>
          <Title level={3} style={{ textAlign: 'center', color: 'red' }}>
            {activity?.activityName + '活动参与公示'}
          </Title>
          <Paragraph style={{ marginTop: 50, fontSize: 15 }}>
            如有问题，到11教108B 吕伟昕老师处反馈
          </Paragraph>
          <Table
            columns={columns}
            dataSource={activitySignList}
            pagination={false}
            scroll={{ y: 500 }}
          />{' '}
        </>
      ) : (
          <Result
            status="404"
            title="活动尚未结束"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  history.go(-1);
                }}
              >
                返回上一页
              </Button>
            }
          />
      )}
    </Card>
  ) : null;
};

export default ActivitySignCard;
