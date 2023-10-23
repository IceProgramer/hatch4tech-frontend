import { getTeamInfoPageUsingPOST } from '@/services/hatch4tech-team/teamController';
import { useModel } from '@@/exports';
import {
  AuditOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Badge, Button, Card, List, message, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { history } from "@umijs/max";

const MyTeamCard: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [searchParam, setSearchParam] = useState<API.TeamQueryRequest>({
    ...initSearchParam,
    userId: currentUser?.userId,
  });
  const [teamInfo, setTeamInfo] = useState<API.TeamVO[]>();
  const [total, setTotal] = useState<number>();

  const getMyTeamList = async () => {
    try {
      const res = await getTeamInfoPageUsingPOST(searchParam);
      if (res.code === 0) {
        setTeamInfo(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      message.error('获取队伍失败' + error.message);
    }
  };

  useEffect(() => {
    getMyTeamList();
  }, [searchParam]);
  return (
    <>
      <Card title='我的队伍' extra={<Button type='primary' onClick={() => {history.push('/team/add')}}>创建队伍</Button>}>
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
          dataSource={teamInfo}
          renderItem={(teamVO: API.TeamVO) => (
            <List.Item>
              <Badge.Ribbon text={teamVO.competitionInfo?.competitionName ?? '自由队伍'}>
                <Card
                  hoverable
                  cover={<img alt="example" src={teamVO.teamImg} />}
                  actions={[
                    <Tooltip key="apply" placement="bottom" title="请求处理">
                      <Link to={{ pathname: `/team/apply/${teamVO.teamId}` }}>
                        <AuditOutlined key="apply" />
                      </Link>
                    </Tooltip>,
                    <Tooltip key="edit" placement="bottom" title="编辑队伍">
                      <Link to={{ pathname: `/team/update/${teamVO.teamId}` }}>
                        <EditOutlined key="edit" />
                      </Link>
                    </Tooltip>,
                    <Tooltip key="ellipsis" placement="bottom" title="编辑">
                      <EllipsisOutlined key="ellipsis" />
                    </Tooltip>,
                  ]}
                >
                  <Meta
                    title={teamVO.teamName}
                    description={
                      <>
                        <ExclamationCircleOutlined /> 新的入队申请
                      </>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default MyTeamCard;
