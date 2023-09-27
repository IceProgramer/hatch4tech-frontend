import APPLY_STATUS from '@/enums/ApplyStatusEnum';
import { pastApplyJoinTeamPageUsingPOST } from '@/services/hatch4tech-team/teamUserController';
import { useModel } from '@@/exports';
import { CheckCard } from '@ant-design/pro-components';
import { Avatar, Card, List, message, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

const MyApplyCard: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const { initialState } = useModel('@@initialState');
  const [searchParam, setSearchParam] = useState<API.TeamQueryRequest>({
    ...initSearchParam,
  });
  const [applyList, setApplyList] = useState<API.UserApplyVO[]>();
  const [total, setTotal] = useState<number>();

  const getMyTeamList = async () => {
    try {
      const res = await pastApplyJoinTeamPageUsingPOST(searchParam);
      if (res.code === 0) {
        setApplyList(res.data?.records ?? []);
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
      <Card title="入队申请">
        <List
          grid={{ gutter: 10, column: 1 }}
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
          dataSource={applyList}
          renderItem={(applyVO: API.UserApplyVO) => (
            <List.Item style={{margin: "0 50px"}}>
              <CheckCard
                checked={false}
                title={
                  <Space>
                    <div>{applyVO.teamName}</div>
                    {applyVO.applyStatus === APPLY_STATUS.NOT_HANDLE.value && (
                      <Tag color="green">{APPLY_STATUS.NOT_HANDLE.name}</Tag>
                    )}
                    {applyVO.applyStatus === APPLY_STATUS.REJECT.value && (
                      <Tag color="red">{APPLY_STATUS.REJECT.name}</Tag>
                    )}
                    {applyVO.applyStatus === APPLY_STATUS.PASS.value && (
                      <Tag color="red">{APPLY_STATUS.PASS.name}</Tag>
                    )}
                  </Space>
                }
                avatar={<Avatar src={applyVO.teamImg} size="large" />}
                style={{ width: '100%' }}
                size="large"
                description={'Re: ' + applyVO.failedMessage ?? '暂无'}
                value="SOFABoot"
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default MyApplyCard;
