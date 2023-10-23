import TEAM_STATUS from '@/enums/TeamStatusEnum';
import { getTeamInfoPageUsingPOST } from '@/services/hatch4tech-team/teamController';
import { CheckCard, ProDescriptions } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Divider, Input,
  List,
  message,
  Modal,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

import { applyJoinTeamUsingPOST } from '@/services/hatch4tech-team/teamUserController';
import Meta from 'antd/es/card/Meta';
import CheckableTag from 'antd/es/tag/CheckableTag';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'umi';
const { Search } = Input;


const { Text } = Typography;

const colorList = [
  'red',
  'magenta',
  'volcano',
  'orange',
  'gold',
  'lime',
  'cyan',
  'green',
  'blue',
  'geekblue',
  'purple',
];

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const rightCarousel = (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    }
  >
    <Meta title="广告位" description="www.instagram.com" />
  </Card>
);

const ShowTeam: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const [searchParam, setSearchParam] = useState<API.TeamQueryRequest>({ ...initSearchParam });
  const [teamData, setTeamData] = useState<API.TeamVO[]>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [rightCard, setRightCard] = useState<ReactNode>(rightCarousel);
  const [total, setTotal] = useState<number>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<API.TeamVO>();
  const [tagId, setTagId] = useState<number>();

  /**
   * 获取队伍信息
   */
  const loadTeamData = async () => {
    setSearchLoading(true);

    try {
      const res = await getTeamInfoPageUsingPOST(searchParam);
      if (res.code === 0) {
        setTeamData(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (e: any) {
      message.error('获取队伍信息失败，' + e.message);
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    loadTeamData();
    console.log(teamData);
  }, [searchParam]);

  /**
   * 切换展示队伍信息
   * @param teamVO
   */
  const changeTeam = (teamVO: API.TeamVO) => {
    let teamStatus;
    if (teamVO.teamMember?.length === teamVO.maxNum) {
      teamStatus = <Badge status="error" text={TEAM_STATUS.FULL} />;
    } else {
      teamStatus = <Badge status="processing" text={TEAM_STATUS.EMPTY} />;
    }
    setRightCard(
      <Card style={{ width: 300 }} cover={<img alt="example" src={teamVO?.teamImg} />}>
        <Space direction={'vertical'}>
          <Meta avatar={<Avatar src={teamVO.createUser?.userAvatar} />} title={teamVO.teamName} />
          <ProDescriptions
            column={1}
            dataSource={{
              teamSlogan: teamVO.slogan,
              competition: (
                <Link to="/competition">{teamVO?.competitionInfo?.competitionName ?? '暂无'}</Link>
              ),
              teamStatus: teamStatus,
              maxNum: `${teamVO.maxNum} 人 （现有 ${teamVO.teamMember?.length} 人）`,
              teamMember: (
                <Avatar.Group shape="square" maxCount={5}>
                  {teamVO.teamMember?.map((member) => (
                    <Tooltip key={member.memberId} title={member.memberName} placement="top">
                      <Avatar src={member.memberAvatar} />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              ),
              teacher: teamVO.teacherInfoList?.map((teacherVO) => (
                <Link key={teacherVO.userId} to={'/teacher'}>
                  <Tag color="#87d068">
                    {teacherVO.teacherName}
                  </Tag>
                </Link>
              )),
              teamTag: (
                <Space size={[0, 8]} wrap>
                  {teamVO.teamTags?.map((tag) => (
                    <CheckableTag key={tag.tagId} checked={(tag.tagNum ?? 0) > (tag.hasNum ?? 0)}>
                      {tag.tagName}
                    </CheckableTag>
                  ))}
                </Space>
              ),
              experience: (
                <Paragraph>
                  <ul>
                    {teamVO.createUser?.userHonor?.map((honor) => (
                      <li key={honor}>
                        <Text>{honor}</Text>
                      </li>
                    ))}
                  </ul>
                </Paragraph>
              ),
              teamDescript: teamVO.teamDescript,
            }}
            columns={[
              {
                title: '队伍口号',
                key: 'text',
                dataIndex: 'teamSlogan',
                copyable: true,
              },
              {
                title: '报名比赛',
                key: 'text',
                dataIndex: 'competition',
              },
              {
                title: '队伍状态',
                dataIndex: 'teamStatus',
              },
              {
                title: '队伍人数',
                key: 'text',
                dataIndex: 'maxNum',
              },
              {
                title: '队伍成员',
                dataIndex: 'teamMember',
              },
              {
                title: '指导老师',
                dataIndex: 'teacher',
              },
              {
                title: '队伍职能',
                dataIndex: 'teamTag',
              },
              {
                title: '队伍简介',
                dataIndex: 'teamDescript',
              },
              {
                title: '比赛经历',
                dataIndex: 'experience',
              },
            ]}
          />
        </Space>
      </Card>,
    );
  };

  /**
   * 退出队伍
   * @param teamId
   */
  const quitTeam = (teamId: number) => {
    alert('退出队伍' + teamId);
  };

  /**
   * 删除队伍
   * @param teamId
   */
  const deleteTeam = (teamId: number) => {
    alert('解散队伍' + teamId);
  };

  /**
   * 编辑队伍
   * @param teamId
   */
  const updateTeam = (teamId: number) => {
    history.push(`/team/update/${teamId}`);
  };

  /**
   * 申请队伍
   * @param modalData
   */
  const applyTeam = (modalData: API.TeamVO) => {
    // alert('申请队伍' + teamId);
    setModalData(modalData);
    setOpen(true);
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={18}>
          <Search
            placeholder="搜索竞赛信息"
            loading={searchLoading}
            enterButton="搜索"
            size="large"
            onSearch={(value) => {
              // 设置搜索信息
              setSearchParam({
                ...initSearchParam,
                searchText: value,
              });
            }}
          />
          <Divider style={{ margin: '8px 0' }} />
          <List
            itemLayout="vertical"
            size="large"
            loading={searchLoading}
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
            dataSource={teamData}
            renderItem={(item) => (
              <Badge.Ribbon text={item.competitionInfo?.competitionName ?? '自由队伍'}>
                <Card style={{ marginTop: '5px' }}>
                  <List.Item
                    key={item.teamId}
                    extra={<img width={230} alt="logo" src={item.teamImg} />}
                  >
                    <List.Item.Meta
                      title={<a onClick={() => changeTeam(item)}>{item.teamName}</a>}
                      avatar={<Avatar src={item.createUser?.userAvatar} />}
                      description={
                        <div>
                          {item.teamTags?.map((tag) => (
                            <Tag key={tag.tagId} color={colorList.at(Math.random() * 11)}>
                              {tag.tagName} × {tag.tagNum}
                            </Tag>
                          ))}
                          总人数: {item.maxNum} 人
                        </div>
                      }
                    />
                    <List.Item.Meta
                      description={
                        <div>
                          <Text style={{ marginRight: '18px' }}>创建用户:</Text>
                          <Link to="/welcome">{item.createUser?.userName}</Link>
                        </div>
                      }
                    />
                    <List.Item.Meta
                      description={
                        <Avatar.Group
                          maxCount={3}
                          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                        >
                          <div>
                            <Text style={{ marginRight: '18px' }}>队伍成员:</Text>
                            {item.teamMember?.map((member) => (
                              <Tooltip
                                placement="top"
                                key={member.memberId}
                                title={member.memberName}
                              >
                                <Avatar key={member.memberId} src={member.memberAvatar} />
                              </Tooltip>
                            ))}
                          </div>
                        </Avatar.Group>
                      }
                    />
                    <List.Item.Meta
                      description={
                        <Paragraph
                          ellipsis={{
                            expandable: true,
                          }}
                        >
                          {item.teamDescript}
                        </Paragraph>
                      }
                    />
                    <Divider />
                    <div>
                      <Space wrap>
                        <Button
                          key="more-information"
                          type={'primary'}
                          onClick={() => changeTeam(item)}
                        >
                          了解更多
                        </Button>
                        {!item.teamMember
                          ?.map((member) => member.memberId)
                          .includes(currentUser?.userId) && (
                          <Button
                            key="add-team"
                            onClick={() => {
                              applyTeam(item);
                            }}
                            disabled={item.hasApply}
                          >
                            申请加入
                          </Button>
                        )}
                        {currentUser?.userId !== item.createUser?.userId &&
                          item.teamMember
                            ?.map((team) => team.memberId)
                            .includes(currentUser?.userId) && (
                            <Button
                              key="quit-team"
                              onClick={() => {
                                quitTeam(item.teamId ?? 0);
                              }}
                              danger
                            >
                              退出队伍
                            </Button>
                          )}
                        {currentUser?.userId === item.createUser?.userId && (
                          <Button
                            key="delete-team"
                            onClick={() => {
                              deleteTeam(item.teamId ?? 0);
                            }}
                            danger
                          >
                            解散队伍
                          </Button>
                        )}
                        {currentUser?.userId === item.createUser?.userId && (
                          <Button
                            key="update-team"
                            onClick={() => {
                              updateTeam(item.teamId ?? 0);
                            }}
                          >
                            编辑队伍
                          </Button>
                        )}
                      </Space>
                    </div>
                  </List.Item>
                </Card>
              </Badge.Ribbon>
            )}
          />
        </Col>
        <Col span={6}>{rightCard}</Col>
      </Row>
      {modalData ? (
        <Modal
          title={'申请加入队伍 - ' + modalData.teamName}
          open={open}
          onOk={async () => {
            const joinTeamRequest: API.JoinTeamRequest = {
              tagId: tagId,
              teamId: modalData?.teamId,
            };
            const res = await applyJoinTeamUsingPOST(joinTeamRequest);
            if (res.code === 0) {
              message.success('申请队伍成功');
              setOpen(false);
            }
          }}
          onCancel={() => setOpen(false)}
        >
          <CheckCard.Group
            onChange={(value) => {
              const tagIdStr = (value ?? '').toString();
              setTagId(parseInt(tagIdStr));
            }}
          >
            {modalData.teamTags
              ?.filter((tag) => (tag.hasNum ?? 0) < (tag.tagNum ?? 0))
              .map((tag) => (
                <CheckCard
                  size="small"
                  key={tag.tagId}
                  value={tag.tagId}
                  title={
                    <Space>
                      <div>{tag.tagName}</div>
                      <Text type="secondary">
                        ({tag.hasNum} / {tag.tagNum})
                      </Text>
                    </Space>
                  }
                />
              ))}
          </CheckCard.Group>
        </Modal>
      ) : null}
    </>
  );
};
export default ShowTeam;
