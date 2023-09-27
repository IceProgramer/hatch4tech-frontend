import { pageCompetitionUsingPOST } from '@/services/hatch4tech-competition/competitionController';
import { history } from '@umijs/max';
import { Badge, Card, Divider, List, message, Space, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import './index.less';
import ProcessBadge from "@/components/ProcessBadge";

const { Text } = Typography;

const ShowCompetition: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };
  const [searchParam, setSearchParam] = useState<API.TeamQueryRequest>({ ...initSearchParam });
  const [total, setTotal] = useState<number>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [competitionList, setCompetitionList] = useState<API.CompetitionVO[]>();

  const getCompetitionList = async () => {
    setSearchLoading(true);
    try {
      const res = await pageCompetitionUsingPOST(searchParam);
      if (res.code === 0) {
        setCompetitionList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      message.error('获取队伍失败' + error.message);
    }
    setSearchLoading(false);
  };



  useEffect(() => {
    getCompetitionList();
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
          dataSource={competitionList}
          renderItem={(competitionVO: API.CompetitionVO) => (
            <List.Item>
              <Card
                onClick={() => {
                  history.push(`/competition/info/${competitionVO.id}`);
                }}
                hoverable
                cover={
                  <img
                    alt={competitionVO.competitionName}
                    height={180}
                    width={240}
                    src={competitionVO.competitionImg}
                  />
                }
              >
                <Meta
                  title={
                    <Space>
                      <Text style={{ maxWidth: '100%' }} ellipsis>
                        {competitionVO.competitionName}
                      </Text>
                      <ProcessBadge
                        startTime={competitionVO.startTime}
                        endTime={competitionVO.endTime}
                      />
                    </Space>
                  }
                  description={`${competitionVO.startTime} ~ ${competitionVO.endTime}`}
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default ShowCompetition;
