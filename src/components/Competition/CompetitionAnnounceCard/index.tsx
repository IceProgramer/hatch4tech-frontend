import { getAnnounceByIdUsingGET } from '@/services/hatch4tech-competition/announceController';
import { DownloadOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, Divider, Result, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Paragraph, Title, Link } = Typography;

interface Props {
  competitionId: number;
}

const CompetitionAnnounceCard: React.FC<Props> = (props) => {
  const { competitionId } = props;
  const [competitionAnnounce, setCompetitionAnnounce] = useState<API.AnnounceVO>();

  const getCompetitionAnnounce = async () => {
    try {
      const res = await getAnnounceByIdUsingGET({ competitionId });
      if (res.code === 0) {
        if (res.data) {
          setCompetitionAnnounce(res.data);
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getCompetitionAnnounce().then();
  }, []);
  return (
    <>
      {competitionAnnounce ? (
        <div className="competitionDetail">
          <Divider orientation="left">结果公示</Divider>
          <Card>
            <Typography style={{ width: '100%' }}>
              <Title level={3} style={{ textAlign: 'center', color: 'red' }}>
                {competitionAnnounce.announceName}
              </Title>
              <Paragraph style={{ marginTop: 50 }}>{competitionAnnounce.announceContent}</Paragraph>
              <Link
                style={{ marginTop: 100 }}
                href={competitionAnnounce.announceFile}
                target="_blank"
              >
                <Space style={{ marginTop: 50 }}>
                  <DownloadOutlined />
                  <span>附件:{competitionAnnounce.announceName}</span>
                </Space>
              </Link>
              <Paragraph style={{marginTop: 10, textAlign: "end"}}>{competitionAnnounce.announceFrom}</Paragraph>
              <Paragraph style={{marginTop: 10, textAlign: "end"}}>{competitionAnnounce.publishTime}</Paragraph>
            </Typography>
          </Card>
        </div>
      ) : (
        <Card>
          <Result
            status="404"
            title="暂无公示信息发布"
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
        </Card>
      )}
    </>
  );
};

export default CompetitionAnnounceCard;
