import {
  Avatar,
  Button,
  Card,
  Dropdown,
  FormListFieldData,
  message,
  Space,
  Tag,
  Upload,
  UploadProps,
} from 'antd';

import React, { useEffect, useState } from 'react';

import FILE_STATUS from '@/enums/BizFileEnum';
import { uploadFileUsingPOST } from '@/services/hatch4tech-biz/fileController';
import { getCompetitionInfoListUsingGET } from '@/services/hatch4tech-competition/competitionController';
import {
  getTeamInfoByIdUsingGET,
  updateTeamUsingPOST,
} from '@/services/hatch4tech-team/teamController';
import { getTeacherInfoListUsingGET } from '@/services/hatch4tech-user/teacherController';
import { DeleteOutlined, EllipsisOutlined, UploadOutlined } from '@ant-design/icons';
import {
  CheckCard,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-form';
import { useParams } from '@umijs/max';
import { UploadChangeParam } from 'antd/es/upload';
import './index.less';

const UpdateTeam: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [teamInfo, setTeamInfo] = useState<API.TeamVO>();
  const [competitionList, setCompetitionList] = useState<{ value: number; label: string }[]>();
  const [teacherList, setTeacherList] = useState<{ value: number; label: string }[]>();
  const params = useParams();

  const getCompetitionList = async () => {
    try {
      const res = await getCompetitionInfoListUsingGET();
      if (res.data) {
        const dataList = res.data.map((plan) => ({
          value: plan.id ?? 0,
          label: plan.competitionName ?? '',
        }));
        setCompetitionList(dataList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTeacherList = async () => {
    try {
      const res = await getTeacherInfoListUsingGET();
      if (res.data) {
        const dataList = res.data.map((plan) => ({
          value: plan.id ?? 0,
          label: plan.teacherName ?? '',
        }));
        setTeacherList(dataList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 获取队伍信息
    if (params.id) {
      const id = parseInt(params.id);
      getTeamInfoByIdUsingGET({ id }).then((res) => {
        if (res.code === 0) {
          setTeamInfo(res.data);
          setImageUrl(res.data?.teamImg);
        }
      });
    }
    getCompetitionList().then();
    getTeacherList().then();
  }, []);

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      setLoading(true);
      console.log(info.file.originFileObj);
      const res = await uploadFileUsingPOST(
        { biz: FILE_STATUS.TEAM_AVATAR },
        {},
        info.file.originFileObj,
      );
      if (res.code === 0) {
        setImageUrl(res.data);
        message.success('图片上传成功');
        setLoading(false);
      }
      return;
    }
  };

  return (
    <>
      {teamInfo ? (
        <ProForm
          layout="horizontal"
          initialValues={teamInfo}
          submitter={{
            // resetButtonProps: {
            //   style: {
            //     marginLeft: 10
            //   },
            // },
            submitButtonProps: {
              style: {
                width: 100
              }
            },
            resetButtonProps: {
              style: {
                marginLeft: "40%",
                width: 100
              }
            }

          }}
          onFinish={async (value: API.TeamUpdateRequest) => {
            const teamUpdateRequest: API.TeamUpdateRequest = {
              ...value,
              id: teamInfo?.teamId
            }
            const res = await updateTeamUsingPOST(teamUpdateRequest);
            if (res.code === 0) {
              message.success('队伍更新成功');
            }
          }}
        >
          <Card>
            <Space size={80}>
              <Space align="center" direction={'vertical'} style={{ marginLeft: 100 }}>
                <Avatar shape="square" size={200} src={imageUrl} />
                <Upload showUploadList={false} onChange={handleChange}>
                  <Button loading={loading} icon={<UploadOutlined />}>
                    更改队伍头像
                  </Button>
                </Upload>
              </Space>
              <Space direction="vertical">
                <ProFormText
                  name="teamName"
                  label="队伍名称"
                  width="md"
                  placeholder="请输入队伍名称"
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="slogan"
                  label="队伍口号"
                  width="md"
                  tooltip="不超过16字"
                  placeholder="请输入队伍口号"
                  rules={[
                    {
                      message: '口号不超过16字',
                      pattern: /^.{0,20}$/,
                    },
                  ]}
                />
                <ProFormTextArea
                  name="teamDescript"
                  label="队伍描述"
                  placeholder="请输入队伍简介"
                  width={'xl'}
                  rules={[{ required: true }]}
                />
              </Space>
            </Space>
          </Card>
          <Card>
            <Space size={100}>
              <ProFormSelect
                name="competitionId"
                options={competitionList}
                initialValue={teamInfo.competitionInfo?.id}
                width="sm"
                label="关联竞赛信息(选填)"
              />
              <ProFormSelect
                name="teacherId"
                options={teacherList}
                width="sm"
                initialValue={teamInfo.teacherInfo?.userId}
                label="指导教师(选填)"
              />
              {teamInfo.competitionInfo ? <></> : null}
            </Space>
          </Card>
          <Card>
            <ProFormDigit
              name="maxNum"
              label="最大人数"
              tooltip="队伍人数不能超过20人"
              width="sm"
              initialValue={3}
              max={20}
              min={teamInfo.teamMember?.length}
              rules={[{ required: true }]}
            />
            <ProFormDependency name={['maxNum']}>
              {({ maxNum }) => {
                return (
                  <>
                    <ProFormList
                      name="teamTags"
                      tooltip="队伍职能总人数必须等于队伍总人数要求"
                      label="队伍人员分配设置"
                      alwaysShowItemLabel
                      deleteIconProps={false}
                      copyIconProps={false}
                      // deleteIconProps={(teamInfo?.teamTags?.length ?? 0) > 0}
                    >
                      {(meta: FormListFieldData, index: number, action) => {
                        return (
                          <ProForm.Group key="tags">
                            <Space direction="vertical">
                              <Space align="baseline">
                                <ProFormText
                                  name="tagName"
                                  label="职能名称"
                                  width="md"
                                  placeholder="请输入队伍职能（例如：后端开发）"
                                  rules={[{ required: true }]}
                                />
                                <ProFormDigit
                                  name="tagNum"
                                  label="职能人数"
                                  max={maxNum}
                                  width="sm"
                                  rules={[{ required: true }]}
                                />
                                <DeleteOutlined
                                  onClick={() => {
                                    const { hasNum } = action.getCurrentRowData();
                                    if (hasNum > 0) {
                                      message.error('队伍职能有成员，不能直接删除');
                                      return;
                                    }
                                    action.remove?.(index);
                                  }}
                                />
                              </Space>
                              {action.getCurrentRowData().hasNum > 0
                                ? teamInfo?.teamMember
                                    ?.filter(
                                      (item) =>
                                        item.memberTag === action.getCurrentRowData().tagName,
                                    )
                                    .map((member) => (
                                      <Space key={member.memberTag} size={[10, 3]} wrap>
                                        <CheckCard
                                          checked={false}
                                          size="small"
                                          avatar={member.memberAvatar}
                                          title={
                                            <div>
                                              <div>{member.memberName}</div>
                                              <Tag color="blue">{member.memberTag}</Tag>
                                            </div>
                                          }
                                          extra={
                                            <Dropdown
                                              placement="topCenter"
                                              menu={{
                                                onClick: ({ domEvent, key }) => {
                                                  domEvent.stopPropagation();
                                                  if (key === 'deleteMember') {
                                                    // TODO 删除队员
                                                  }
                                                },
                                                items: [
                                                  {
                                                    label: '踢出队员',
                                                    key: 'deleteMember',
                                                  },
                                                  {
                                                    label: '查看简介',
                                                    key: 'detailMember',
                                                  },
                                                ],
                                              }}
                                            >
                                              <EllipsisOutlined
                                                style={{ fontSize: 22, color: 'rgba(0,0,0,0.5)' }}
                                                onClick={(e) => e.stopPropagation()}
                                              />
                                            </Dropdown>
                                          }
                                        />
                                      </Space>
                                    ))
                                : null}
                            </Space>
                          </ProForm.Group>
                        );
                      }}
                    </ProFormList>
                  </>
                );
              }}
            </ProFormDependency>
          </Card>
        </ProForm>
      ) : null}
    </>
  );
};
export default UpdateTeam;
