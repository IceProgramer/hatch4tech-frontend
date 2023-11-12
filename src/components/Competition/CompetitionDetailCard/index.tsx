import ProcessBadge from '@/components/ProcessBadge';
import { favourCompetitionUsingPOST } from '@/services/hatch4tech-competition/competitionFavourController';
import { ShareAltOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Card, Divider, message, Space, Tooltip, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import './index.less';

const { Paragraph } = Typography;

interface Props {
  competition: API.CompetitionVO;
}

const CompetitionDetailCard: React.FC<Props> = (props) => {
  const { competition } = props;

  const [favourNum, setFavourNum] = useState<number>(competition.favourNum ?? 0);
  const [hasFavour, setHasFavour] = useState<boolean>(competition.hasFavour ?? false);
  const [loading, setLoading] = useState<boolean>(false);

  const starCompetition = async () => {
    setLoading(true);
    // 收藏
    if (!hasFavour) {
      const competitionFavourRequest: API.CompetitionFavourRequest = {
        competitionId: competition.id,
      };
      const res = await favourCompetitionUsingPOST(competitionFavourRequest);
      if (res.code === 0) {
        setFavourNum(favourNum + 1);
        setHasFavour(true);
        message.success('收藏成功');
      }
    }
    // 取消收藏
    if (hasFavour) {
      const competitionFavourRequest: API.CompetitionFavourRequest = {
        competitionId: competition.id,
      };
      const res = await favourCompetitionUsingPOST(competitionFavourRequest);
      if (res.code === 0) {
        setFavourNum(favourNum - 1);
        setHasFavour(false);
        message.success('取消收藏成功');
      }
    }
    setLoading(false);
  };

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
                title={
                  <Space>
                    <span>{competition?.competitionName}</span>
                    {/*<Space.Compact block>*/}
                    {/*  <Tooltip title={hasFavour ? '取消收藏' : '收藏'}>*/}
                    {/*    <Button loading={loading} onClick={starCompetition}>*/}
                    {/*      {hasFavour ? <StarFilled /> : <StarOutlined />}*/}
                    {/*      <span>{favourNum}</span>*/}
                    {/*    </Button>*/}
                    {/*  </Tooltip>*/}
                    {/*  <Tooltip title="分享">*/}
                    {/*    <Button icon={<ShareAltOutlined />} />*/}
                    {/*  </Tooltip>*/}
                    {/*</Space.Compact>*/}
                  </Space>
                }
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
