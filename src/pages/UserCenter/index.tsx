import MyStarCard from '@/components/MyStarCard';
import TodoCard from '@/components/TodoCard';
import FILE_STATUS from '@/enums/BizFileEnum';
import { uploadFileUsingPOST } from '@/services/hatch4tech-biz/fileController';
import {
  getStudentInfoByIdUsingGET,
  listStudentPlanUsingGET,
  listStudentPoliticsUsingGET,
  updateStudentInfoUsingPOST,
} from '@/services/hatch4tech-user/studentController';
import { listStudentWishUsingGET } from '@/services/hatch4tech-user/studentWishController';
import { useModel } from '@@/exports';
import {
  AuditOutlined,
  CalendarOutlined,
  StarOutlined,
  TeamOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  ProDescriptions,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  SelectProps,
  Space,
  Tabs,
  TabsProps,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import Meta from 'antd/es/card/Meta';
import { UploadChangeParam } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Title, Text } = Typography;
const options: SelectProps['options'] = [];

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (
      <span>
        <AuditOutlined />
        我的申请
      </span>
    ),
    // children: <MyApplyCard />,
    children: <TodoCard title={'我的申请'} />,
  },
  {
    key: '2',
    label: (
      <span>
        <TeamOutlined />
        我的队伍
      </span>
    ),
    // children: <MyTeamCard />,
    children: <TodoCard title={'我的队伍'} />,
  },
  {
    key: '3',
    label: (
      <span>
        <CalendarOutlined />
        我的日程
      </span>
    ),
    // children: <MyCalendarCard />,
    children: <TodoCard title={'我的日程'} />,
  },
  {
    key: '4',
    label: (
      <span>
        <StarOutlined />
        我的活动
      </span>
    ),
    children: <MyStarCard />,
  },
];

const MyApplication: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [userInfo, setUserInfo] = useState<API.StudentInfoVO>();
  const [userUpdateVisit, setUserUpdateVisit] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [politicsList, setPoliticsList] = useState<{ value: number; label: string }[]>();
  const [wishIdList, setWishIdList] = useState<number[]>();
  const [studentPlanList, setStudentPlanList] = useState<{ value: number; label: string }[]>();
  const [planId, setPlanId] = useState<number>();
  // 获取学生愿景列表
  const getStudentWishList = async () => {
    try {
      const res = await listStudentWishUsingGET();
      if (res.data) {
        res.data.map((wish) =>
          options.push({
            label: wish.wishName,
            value: wish.wishId,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 获取学生未来计划列表
  const getStudentPlanList = async () => {
    try {
      const res = await listStudentPlanUsingGET();
      if (res.data) {
        const dataList = res.data.map((plan) => ({
          value: plan.id ?? 0,
          label: plan.planName ?? '',
        }));
        setStudentPlanList(dataList);
        // const planId = studentPlanList?.filter((plan) => plan.label === userInfo?.studentPlan)[0].value;
        // setPlanId(planId);
        // console.log("planId: " + planId)
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        setUserInfo({
          ...userInfo,
          userAvatar: imageUrl,
        });
        message.success('图片上传成功');
        setLoading(false);
      }
      return;
    }
  };

  // 获取政治背景列表
  const getPoliticsList = async () => {
    try {
      const res = await listStudentPoliticsUsingGET();
      if (res.data) {
        const dataList = res.data.map((politics) => ({
          value: politics.id ?? 0,
          label: politics.politicsName ?? '',
        })) as { value: number; label: string }[];
        setPoliticsList(dataList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStudentInfo = async () => {
    try {
      const id = currentUser?.userId;
      const res = await getStudentInfoByIdUsingGET({ id });
      if (res.code === 0) {
        setUserInfo(res.data);
        if (res.data) {
          setImageUrl(res.data.userAvatar);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudentInfo();
    getPoliticsList();
    getStudentPlanList();
    getStudentWishList();
    setWishIdList(userInfo?.studentWish?.map((wish) => wish.wishId ?? 0));
  }, []);

  const handleSelectChange = (value: any[]) => {
    setWishIdList(value.map((id) => parseInt(id)));
    console.log(wishIdList);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPlanId(e.target.value);
  };

  return (
    <div className="userCenter">
      <Row style={{ marginTop: 10 }}>
        <Col span={4} offset={3}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" width={240} height={248} src={currentUser?.userAvatar} />}
          >
            <Button
              style={{ borderRadius: 20, position: 'absolute', top: '42%', padding: '0 30px' }}
              onClick={() => {
                // history.push('/user/center/info');
                message.warning('暂未开放');
              }}
            >
              个人简历
            </Button>
            <Meta
              title={
                <Space size="large">
                  <span>个人信息</span>
                </Space>
              }
            />
            <ProDescriptions
              style={{ marginTop: '15px' }}
              column={1}
              size="small"
              dataSource={{
                gender: userInfo?.gender,
                race: userInfo?.race,
                age: userInfo?.userAge + ' 岁',
                grade: userInfo?.studentGrade,
                politics: userInfo?.studentPolitics,
              }}
              columns={[
                {
                  title: '性别',
                  key: 'text',
                  dataIndex: 'gender',
                },
                {
                  title: '民族',
                  key: 'text',
                  dataIndex: 'race',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                },
                {
                  title: '年级',
                  dataIndex: 'grade',
                },
                {
                  title: '政治',
                  dataIndex: 'politics',
                },
              ]}
            />
          </Card>
          <Card hoverable style={{ width: 240, marginTop: 6 }}>
            <Descriptions
              size="middle"
              column={1}
              layout="vertical"
              items={[
                {
                  key: 'studentProfile',
                  label: '个人简介',
                  children: userInfo?.studentProfile,
                },
                {
                  key: 'studentSkill',
                  label: '优势及特长',
                  children: userInfo?.studentSkill,
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={14} offset={1} style={{ marginTop: '3%' }}>
          <Title style={{ color: 'white' }}>
            <Space size={30}>
              {currentUser?.userName}{' '}
              <span style={{ fontSize: 20, color: '#aeaeae' }}>
                个人口号：「{userInfo?.userSlogan}」
              </span>
            </Space>
            <Button
              onClick={() => {
                setUserUpdateVisit(true);
              }}
              style={{ float: 'right', marginTop: 12, borderRadius: 20, padding: '0 30px' }}
            >
              修改个人信息
            </Button>
          </Title>
          <Tabs items={items} />
        </Col>
      </Row>
      {userInfo ? (
        <ModalForm
          title="修改个人信息"
          open={userUpdateVisit}
          onFinish={async (value: any) => {
            const userUpdateRequest: API.StudentUpdateRequest = {
              ...value,
              userId: currentUser?.userId ?? 0,
              userAvatar: imageUrl,
              studentPolitics: politicsList?.filter(
                (politics) => value.studentPolitics === politics.label,
              )[0].value,
              studentWish: wishIdList,
              studentPlan: planId,
            };
            console.log(userUpdateRequest);
            try {
              const res = await updateStudentInfoUsingPOST(userUpdateRequest);
              if (res.code === 0) {
                message.success('更新成功');
                setUserUpdateVisit(true);
              }
            } catch (error: any) {
              console.log(error);
            }
          }}
          onOpenChange={setUserUpdateVisit}
          initialValues={userInfo}
          layout="horizontal"
        >
          <Space direction="vertical">
            <Space size={50}>
              <Space align="center" direction={'vertical'} style={{ marginLeft: 100 }}>
                <Avatar shape="square" size={150} src={imageUrl} />
                <Upload showUploadList={false} onChange={handleChange}>
                  <Button loading={loading} icon={<UploadOutlined />}>
                    更改用户头像
                  </Button>
                </Upload>
              </Space>
              <Space direction="vertical">
                <ProFormText name="userName" label="姓名" width="sm" disabled />
                <ProFormText
                  name="userSlogan"
                  label="个人口号"
                  width="sm"
                  placeholder="请输入个人口号"
                  rules={[{ required: true }]}
                />
                <ProFormTextArea
                  name="studentProfile"
                  label="学生描述"
                  placeholder="请输入个人简介"
                  width="md"
                  rules={[{ required: true }]}
                />
              </Space>
            </Space>
            <ProFormTextArea
              name="studentSkill"
              label="学生优势"
              placeholder="请输入个人优势"
              width="xl"
              rules={[{ required: true }]}
            />
            <Space size={100}>
              <ProFormText
                name="phone"
                label="手机号码"
                width="sm"
                placeholder="请输入手机号码"
                rules={[{ required: true, pattern: /^1[3456789]\d{9}$/, message: '手机格式错误' }]}
              />
              <ProFormText
                name="email"
                label="邮箱"
                width="sm"
                placeholder={'请输入邮箱'}
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                    message: '邮箱格式错误',
                  },
                ]}
              />
            </Space>
            <Space size="large" align={'start'}>
              <ProFormSelect
                name="studentPolitics"
                label="政治面貌"
                width="sm"
                options={politicsList}
                rules={[{ required: true }]}
              />
              <Space>
                <Text>学生愿景:</Text>
                <Select
                  mode="multiple"
                  style={{ width: 300 }}
                  onChange={handleSelectChange}
                  defaultValue={userInfo.studentWish?.map((wish) => wish.wishId)}
                  options={options}
                />
              </Space>
            </Space>
            <Space>
              <Text>学生未来规划：</Text>
              <Radio.Group onChange={onChange} value={studentPlanList?.filter((plan) => plan.label === userInfo?.studentPlan)[0].value}>
                {studentPlanList?.map((plan) => {
                  return (
                    <Radio key={plan.value} value={plan.value}>
                      {plan.label}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Space>
          </Space>
        </ModalForm>
      ) : null}
    </div>
  );
};
export default MyApplication;
