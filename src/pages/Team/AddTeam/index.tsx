import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, message, Space, Typography, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';

const { Text } = Typography;
import React, { useEffect, useState } from 'react';

import FILE_STATUS from '@/enums/BizFileEnum';
import { uploadFileUsingPOST } from '@/services/hatch4tech-biz/fileController';
import { getCompetitionInfoListUsingGET } from '@/services/hatch4tech-competition/competitionController';
import { createTeamUsingPOST } from '@/services/hatch4tech-team/teamController';
import { getTeacherInfoListUsingGET } from '@/services/hatch4tech-user/teacherController';
import { useModel } from '@@/exports';
import {
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-form';
import { WaterMark } from '@ant-design/pro-layout';
import './index.less';

const AddTeam: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [teamInfo, setTeamInfo] = useState<API.TeamVO>();
  const [competitionList, setCompetitionList] = useState<{ value: number; label: string }[]>();
  const [teacherList, setTeacherList] = useState<{ value: number; label: string }[]>();

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

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
    getCompetitionList();
    getTeacherList();
  }, []);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
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
      }
      return;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传队伍头像</div>
    </div>
  );
  return (
    <>
      <WaterMark content={currentUser?.userName}>
        <Card>
          <ProForm
            name="validate_other"
            initialValues={teamInfo}
            onFinish={async (value: API.TeamCreateRequest) => {
              const teamCreateRequest: API.TeamCreateRequest = {
                ...value,
                teamImg: imageUrl,
              };
              const res = await createTeamUsingPOST(teamCreateRequest);
              if (res.code === 0) {
                message.success('队伍创建成功');
              }
              console.log(teamCreateRequest);
            }}
          >
            <Text>队伍头像</Text>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
            <ProFormText
              name="teamName"
              label="队伍名称"
              width="md"
              placeholder="请输入队伍名称"
              rules={[{ required: true }]}
            />
            <ProFormTextArea
              name="teamDescript"
              label="队伍描述"
              placeholder="请输入队伍简介"
              width={'xl'}
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
            <Space>
              <ProFormSelect
                name="competitionId"
                options={competitionList}
                width="sm"
                label="关联竞赛信息(选填)"
              />
              <ProFormSelect
                name="teacherId"
                options={teacherList}
                width="sm"
                label="指导教师(选填)"
              />
            </Space>
            <ProFormDigit
              name="maxNum"
              label="最大人数"
              tooltip="队伍人数不能超过20人"
              width="sm"
              initialValue={3}
              max={20}
              min={3}
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
                      initialValue={[
                        {
                          tagName: '后端开发',
                          tagNum: 1,
                        },
                      ]}
                    >
                      <ProForm.Group key="tags">
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
                      </ProForm.Group>
                    </ProFormList>
                  </>
                );
              }}
            </ProFormDependency>
            <ProFormDependency name={['teamTags']}>
              {({ teamTags }) => {
                const tagNameList = teamTags.map((teamTag: any) => {
                  return teamTag.tagName ?? '';
                });
                return (
                  <>
                    <ProFormSelect
                      name="tagName"
                      label="队长队伍职能"
                      options={tagNameList}
                      width="sm"
                      rules={[{ required: true }]}
                    />
                  </>
                );
              }}
            </ProFormDependency>
          </ProForm>
        </Card>
      </WaterMark>
    </>
  );
};
export default AddTeam;
