import CompetitionDetailCard from '@/components/Competition/CompetitionDetailCard';
import { getCompetitionVOByIdUsingGET } from '@/services/hatch4tech-competition/competitionController';
import { BulbTwoTone, NotificationTwoTone, ProjectTwoTone } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { Col, message, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import CompetitionAnnounceCard from "@/components/Competition/CompetitionAnnounceCard";
import CompetitionSignUpCard from "@/components/Competition/CompetitionSignUpCard";


const CompetitionInfo: React.FC = () => {
  const [competition, setCompetition] = useState<API.CompetitionVO>();
  const params = useParams();

  // 获取竞赛信息
  const getCompetition = async () => {
    try {
      if (params.id) {
        const id = parseInt(params.id);
        const res = await getCompetitionVOByIdUsingGET({ id });
        if (res.code === 0) {
          setCompetition(res.data);
        }
      }
    } catch (e: any) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    getCompetition().then();
  }, []);

  return (
    <>
      {competition ? (
        <div className="competitionInfo">
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
                        <ProjectTwoTone /> 比赛通知
                      </span>
                    ),
                    children: <CompetitionDetailCard competition={competition} />,
                  },
                  {
                    key: '2',
                    label: (
                      <span>
                        <BulbTwoTone />
                        比赛报名
                      </span>
                    ),
                    children: <CompetitionSignUpCard competition={competition} />,
                  },
                  {
                    key: '3',
                    label: (
                      <span>
                        <NotificationTwoTone />
                        结果公示
                      </span>
                    ),
                    children: <CompetitionAnnounceCard competitionId={competition.id ?? 0} />,
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

export default CompetitionInfo;
