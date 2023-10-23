import ProcessBadge from '@/components/ProcessBadge';
import { pageActivityUsingPOST } from '@/services/hatch4tech-activity/activityController';
import { history } from '@umijs/max';
import { Card, Divider, Input, List, message, Space, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import './index.less';
import dayjs from "dayjs";

const { Search } = Input;

const { Text } = Typography;

const ShowActivity: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };
  const [searchParam, setSearchParam] = useState<API.ActivityQueryRequest>({ ...initSearchParam });
  const [total, setTotal] = useState<number>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [activityList, serActivityList] = useState<API.ActivityVO[]>();

  const getActivityList = async () => {
    setSearchLoading(true);
    try {
      const res = await pageActivityUsingPOST(searchParam);
      if (res.code === 0) {
        serActivityList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      message.error('获取活动失败' + error.message);
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    getActivityList();
  }, [searchParam]);

  return (
    <>
      <Search
        placeholder="请输入搜索内容"
        className="search"
        enterButton="搜索"
        size="large"
        loading={searchLoading}
        onSearch={(value) => {
          // 设置搜索信息
          setSearchParam({
            ...initSearchParam,
            searchText: value,
          });
        }}
      />
      <Divider />
      <Card>
        <List
          grid={{ gutter: 22, column: 4 }}
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
                  onClick={() => {
                    history.push(`/activity/info/${activityVO.id}`);
                  }}
                  hoverable
                  cover={
                    <img
                      alt={activityVO.activityName}
                      height={180}
                      width={240}
                      src={activityVO.activityImg}
                    />
                  }
                >
                  <Meta
                    title={
                      <Text style={{ maxWidth: '100%' }} ellipsis>
                        {activityVO.activityName}
                      </Text>
                    }
                    description={
                      <Space direction="vertical">
                        <div>
                          <Text>状态：</Text>
                          <ProcessBadge
                            startTime={activityVO.startTime}
                            endTime={activityVO.endTime}
                          />
                        </div>
                        <div>
                          {activityVO.startTime} ~ {activityVO.endTime}
                        </div>
                      </Space>
                    }
                  />
                </Card>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default ShowActivity;
