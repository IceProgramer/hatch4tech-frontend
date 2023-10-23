import { getTeamInfoPageUsingPOST } from '@/services/hatch4tech-team/teamController';
import { history } from '@umijs/max';
import { Button, Card, Divider, Popover, Result, Space, Steps, StepsProps } from 'antd';
import { StepProps } from 'antd/es/steps';
import React, { useEffect, useState } from 'react';

interface Props {
  competition: API.CompetitionVO;
}

const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
const CompetitionSignUpCard: React.FC<Props> = (props) => {
  const { competition } = props;

  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const [searchParam, setSearchParam] = useState<API.TeamQueryRequest>({ ...initSearchParam });
  const [teamList, setTeamList] = useState<API.TeamVO[]>();
  const [total, setTotal] = useState<number>();

  // 获取相关竞赛队伍信息
  const getCompetitionTeamList = async () => {
    try {
      const teamQueryRequest: API.TeamQueryRequest = {
        ...searchParam,
        competitionId: competition.id,
      };
      const res = await getTeamInfoPageUsingPOST(teamQueryRequest);
      if (res.code === 0) {
        setTeamList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompetitionTeamList();
  }, [searchParam]);

  const items: StepProps[] = competition.statusList?.map((item) => ({
    title: item.statusName ?? '',
    subTitle: item.statusTime ?? '',
    status: item.hasComplete === 0 ? 'wait' : 'finish',
  })) as StepProps[];
  return (
    <>
      <Divider orientation="left">比赛报名</Divider>
      <Card style={{ width: '90%' }}>
        <Space direction="vertical" style={{ width: '100%' }} size={40}>
          <Steps progressDot={customDot} items={items} />
          <Divider orientation="center">竞赛资料上传</Divider>
          <Result
            status="403"
            title="竞赛报名已结束"
            extra={
              <Button type="primary" onClick={() => history.push('/')}>
                返回首页
              </Button>
            }
          />
        </Space>
      </Card>
    </>
  );
};

export default CompetitionSignUpCard;
