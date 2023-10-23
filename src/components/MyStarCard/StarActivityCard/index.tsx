import { getFavourActivityPageUsingPOST } from '@/services/hatch4tech-activity/activityFavourController';
import { history } from '@umijs/max';
import { Card, List } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';

const StarActivityCard: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 6,
  };

  const [searchParam, setSearchParam] = useState<API.TeamQueryRequest>({ ...initSearchParam });
  const [total, setTotal] = useState<number>();
  const [activityList, setActivityList] = useState<API.ActivityVO[]>();

  const getActivityList = async () => {
    try {
      const res = await getFavourActivityPageUsingPOST(searchParam);
      if (res.code === 0) {
        setActivityList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getActivityList().then();
  }, [searchParam]);

  return (
    <>
      <List
        grid={{ gutter: 22, column: 3 }}
        pagination={{
          onChange: (page, pageSize) => {
            console.log(page);
            setSearchParam({
              ...searchParam,
              current: page,
              pageSize,
            });
          },
          pageSize: searchParam.pageSize,
          current: searchParam.current,
          total: total,
        }}
        dataSource={activityList}
        renderItem={(activityVO: API.ActivityVO) => (
          <List.Item>
            <Card
              style={{ height: 200 }}
              onClick={() => {
                history.push(`/activity/info/${activityVO.id}`);
              }}
              hoverable
              cover={<img alt="example" width={200} height={115} src={activityVO.activityImg} />}
            >
              <Meta
                title={<span style={{ fontSize: 13 }}>{activityVO.activityName}</span>}
                description={
                  <span style={{ fontSize: 10 }}>
                    {activityVO.startTime}~{activityVO.endTime}
                  </span>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default StarActivityCard;
