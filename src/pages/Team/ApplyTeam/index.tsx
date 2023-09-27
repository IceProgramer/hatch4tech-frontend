import APPLY_STATUS from '@/enums/ApplyStatusEnum';
import { getTeamInfoByIdUsingGET } from '@/services/hatch4tech-team/teamController';
import {
  applyJoinTeamPageUsingPOST,
  handleTeamApplyUsingPOST,
} from '@/services/hatch4tech-team/teamUserController';
import { useParams } from '@@/exports';
import { ProDescriptions, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-form';
import { Avatar, Button, Card, Col, List, message, Row, Space, Tag, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import { history } from "@umijs/max";

const { Text } = Typography;
const ApplyTeam: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const params = useParams();
  const id = parseInt(params.id ?? '0');

  const [searchParam, setSearchParam] = useState<API.TeamApplyRequest>({
    ...initSearchParam,
    teamId: id,
  });
  const [imageUrl, setImageUrl] = useState<string>();
  const [teamInfo, setTeamInfo] = useState<API.TeamVO>();
  const [applyList, setApplyList] = useState<API.TeamApplyVO[]>();
  const [total, setTotal] = useState<number>();

  // 获取队伍申请列表
  const getTeamApplyList = async () => {
    try {
      const res = await applyJoinTeamPageUsingPOST(searchParam);
      if (res.code === 0) {
        setApplyList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    // 获取队伍信息
    if (params.id) {
      getTeamInfoByIdUsingGET({ id }).then((res) => {
        if (res.code === 0) {
          setTeamInfo(res.data);
          setImageUrl(res.data?.teamImg);
        }
      });
    }
    getTeamApplyList();
  }, [searchParam]);

  const acceptApply = async (failedMessage: string, applyVO: API.TeamApplyVO) => {
    const teamApplyRequest: API.ApplyHandleRequest = {
      applyId: applyVO.id,
      failedMessage: failedMessage ?? '',
      handleStatus: APPLY_STATUS.PASS.value,
    };
    console.log(teamApplyRequest);
    try {
      const res = await handleTeamApplyUsingPOST(teamApplyRequest);
      if (res.code === 0) {
        message.success('成员 ' + applyVO.userName + ' 成功加入队伍');
        history.go(0);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const rejectApply = async (failedMessage: string, applyVO: API.TeamApplyVO) => {
    const teamApplyRequest: API.ApplyHandleRequest = {
      applyId: applyVO.id,
      failedMessage: failedMessage ?? '',
      handleStatus: APPLY_STATUS.REJECT.value,
    };
    console.log(teamApplyRequest);
    try {
      const res = await handleTeamApplyUsingPOST(teamApplyRequest);
      if (res.code === 0) {
        message.success('已拒绝 ' + applyVO.userName + ' 入队申请');
        history.go(0);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Card>
        <Space size={80} align="start">
          <Space align="center" direction={'vertical'} style={{ marginLeft: 100 }}>
            <Avatar shape="square" size={200} src={imageUrl} />
          </Space>
          <ProDescriptions
            style={{ marginTop: '15px' }}
            column={1}
            title={teamInfo?.teamName}
            size="small"
            dataSource={{
              slogan: teamInfo?.slogan,
              teamDescript: teamInfo?.teamDescript,
            }}
            columns={[
              {
                title: '队伍口号',
                key: 'text',
                dataIndex: 'slogan',
              },
              {
                title: '队伍简介',
                dataIndex: 'teamDescript',
              },
            ]}
          />
        </Space>
      </Card>
      <Card style={{ margin: '20px 70px' }} title="入队申请">
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
          renderItem={(applyVO: API.TeamApplyVO) => (
            <List.Item style={{ margin: '10px 50px' }}>
              <Card>
                <ProForm
                  layout="horizontal"
                  submitter={{
                    resetButtonProps: {
                      style: {
                        // 隐藏重置按钮
                        display: 'none',
                      },
                    },
                    submitButtonProps: {
                      style: {
                        // 隐藏重置按钮
                        display: 'none',
                      },
                    },
                  }}
                >
                  <Row align="middle">
                    <Col span={3}>
                      <Meta avatar={<Avatar src={applyVO.userAvatar} />} title={applyVO.userName} />
                    </Col>
                    <Col span={5}>
                      <Text>申请职能：{applyVO.tagName}</Text>
                    </Col>
                    <Col span={5}>
                      <ProFormDependency name={['failedMessage']}>
                        {({ failedMessage }) => {
                          return (
                            <Space size="large">
                              {applyVO.applyStatus === 0 ? (
                                <>
                                  <Button
                                    type="primary"
                                    style={{ background: '#32d793' }}
                                    onClick={() => acceptApply(failedMessage, applyVO)}
                                  >
                                    同意
                                  </Button>
                                  <Button
                                    type="primary"
                                    style={{ background: '#d73231' }}
                                    onClick={() => rejectApply(failedMessage, applyVO)}
                                  >
                                    拒绝
                                  </Button>
                                </>
                              ) : null}
                              {applyVO.applyStatus === 1 ? (
                                <Button type="primary" style={{ color: "white", background: '#32d793' }} disabled>
                                  已同意
                                </Button>
                              ) : null}
                              {applyVO.applyStatus === 2 ? (
                                <Button type="primary" style={{ color: "white", background: '#d73231' }} disabled>
                                  已拒绝
                                </Button>
                              ) : null}
                            </Space>
                          );
                        }}
                      </ProFormDependency>
                    </Col>
                    <Col span={10} style={{ top: 13 }}>
                      <ProFormText
                        name="failedMessage"
                        rules={[{ required: true }]}
                        disabled={applyVO.applyStatus !== 0}
                        initialValue={applyVO.failedMessage}
                        label="填写理由"
                      />
                    </Col>
                  </Row>
                </ProForm>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default ApplyTeam;
