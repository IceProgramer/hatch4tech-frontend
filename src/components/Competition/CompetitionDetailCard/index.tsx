import ProcessBadge from "@/components/ProcessBadge";
import { ProDescriptions } from '@ant-design/pro-components';
import { Card,Divider,Space,Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import './index.less';

const { Paragraph } = Typography;

interface Props {
  competition: API.CompetitionVO;
}

const CompetitionDetailCard: React.FC<Props> = (props) => {
  const { competition } = props;
  return (
    <>
      <div className="competitionDetail">
        <Divider orientation="left">比赛通知</Divider>
        <Card
          cover={
            <img alt={competition.competitionName} height={300} src={competition.competitionImg} />
          }
        >
          <Meta
            title={
              <ProDescriptions
                style={{ marginTop: '15px', width: '100%' }}
                column={1}
                title={competition?.competitionName}
                size="small"
                dataSource={{
                  competitionName: competition?.competitionName,
                  teamTime: (
                    <Space>
                      <div>{`${competition.startTime} 到 ${competition.endTime}`}</div>
                      <ProcessBadge
                        startTime={competition.startTime}
                        endTime={competition.endTime}
                      />
                    </Space>
                  ),
                  competitionHost: competition.competitionHost,
                  competitionDescript: (
                    <Paragraph style={{ width: '100%' }}>
                      <pre>{competition.competitionDescript}</pre>
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
      </div>
    </>
  );
};

export default CompetitionDetailCard;
