import { getFavourCompetitionPageUsingPOST } from '@/services/hatch4tech-competition/competitionFavourController';
import { history } from '@@/core/history';
import { Card, List } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';

const StarCompetitionCard: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 6,
  };

  const [searchParam, setSearchParam] = useState<API.TeamQueryRequest>({ ...initSearchParam });
  const [total, setTotal] = useState<number>();
  const [competitionList, setCompetitionList] = useState<API.CompetitionVO[]>();

  const getCompetitionList = async () => {
    try {
      const res = await getFavourCompetitionPageUsingPOST(searchParam);
      if (res.code === 0) {
        setCompetitionList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCompetitionList().then();
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
        dataSource={competitionList}
        renderItem={(competitionVO: API.CompetitionVO) => (
          <List.Item>
            <Card
              style={{ height: 200 }}
              onClick={() => {
                history.push(`/competition/info/${competitionVO.id}`);
              }}
              hoverable
              cover={
                <img alt="example" width={200} height={115} src={competitionVO.competitionImg} />
              }
            >
              <Meta
                title={<span style={{ fontSize: 13 }}>{competitionVO.competitionName}</span>}
                description={
                  <span style={{ fontSize: 10 }}>
                    {competitionVO.startTime}~{competitionVO.endTime}
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

export default StarCompetitionCard;
