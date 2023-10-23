import {
  checkStudentNumberUsingPOST,
  listStudentPlanUsingGET,
  listStudentPoliticsUsingGET,
  listStudentRaceUsingGET,
  newStudentRegisterUsingPOST,
} from '@/services/hatch4tech-user/studentController';
import { listStudentWishUsingGET } from '@/services/hatch4tech-user/studentWishController';
import { CloseOutlined, SnippetsOutlined } from '@ant-design/icons';
import {
  FormListActionType,
  ProCard,
  ProFormCheckbox,
  ProFormDigit,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface honorType {
  honor: string;
}

interface expType {
  experience: string;
}

export default () => {
  const [raceList, setRaceList] = useState<string[]>(['']);
  const [politicsList, setPoliticsList] = useState<{ value: number; label: string }[]>();
  const [studentWishList, setStudentWishList] = useState<{ value: number; label: string }[]>();
  const [studentPlanList, setStudentPlanList] = useState<{ value: number; label: string }[]>();
  const [userAccount, setUserAccount] = useState<string>();
  // const [studentNumber, setStudentNumber] = useState<string>();

  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();

  // 获取民族列表
  const getRaceList = async () => {
    try {
      const res = await listStudentRaceUsingGET();
      if (res.data) {
        const dataList = res.data.map((race) => race.raceName) as string[];
        setRaceList(dataList);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 获取学生愿景列表
  const getStudentWishList = async () => {
    try {
      const res = await listStudentWishUsingGET();
      if (res.data) {
        const dataList = res.data.map((wish) => ({
          value: wish.wishId ?? 0,
          label: wish.wishName ?? '',
        }));
        setStudentWishList(dataList);
      }
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    getRaceList();
    getPoliticsList();
    getStudentWishList();
    getStudentPlanList();
  }, []);

  return (
    <ProCard>
      <StepsForm<{
        name: string;
        studentExp: { experience: string }[];
        studentHonor: { honor: string }[];
      }>
        onFinish={async (values) => {
          const studentRegister: API.StudentRegisterRequest = {
            ...values,
            studentHonor: values.studentHonor.map((honor) => honor.honor),
            studentExp: values.studentExp.map((exp) => exp.experience),
            userAccount: userAccount,
          };

          console.log(studentRegister);
          const res = await newStudentRegisterUsingPOST(studentRegister);
          if (res.data) {
            message.success('提交成功');
            history.push('/user/login');
          }
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        submitter={{
          render: (props) => {
            if (props.step === 0) {
              return (
                <Button type="primary" onClick={() => props.onSubmit?.()}>
                  下一步
                </Button>
              );
            }

            if (props.step === 1) {
              return [
                <Button key="pre" onClick={() => props.onPre?.()}>
                  返回上一步
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                  下一步
                </Button>,
              ];
            }

            return [
              <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                上一步
              </Button>,
              <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                提交
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm<{
          studentNumber: string;
          userName: string;
        }>
          name="checkUser"
          title="用户核实"
          onFinish={async ({ studentNumber, userName }) => {
            // setStudentName(studentName)
            setUserAccount('Hdu' + studentNumber);
            // setStudentNumber(studentNumber);
            console.log(studentNumber, userName);
            const res = await checkStudentNumberUsingPOST({ studentNumber, userName });
            return res.code === 0;
          }}
        >
          <ProFormText
            name="studentNumber"
            label="学号"
            width="md"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="userName"
            label="姓名"
            width="md"
            placeholder="请输入姓名"
            rules={[{ required: true }]}
          />
          <Space size="large">
            <ProFormDigit
              name="userAge"
              label="年龄"
              style={{ width: 100 }}
              initialValue={18}
              min={0}
              max={90}
              rules={[{ required: true }]}
            />
            <ProFormSelect
              name="gender"
              label="性别"
              style={{ width: 120 }}
              options={[
                { value: 0, label: '男' },
                { value: 1, label: '女' },
              ]}
              rules={[{ required: true }]}
            />
          </Space>
          <br />
          <Space size="large">
            <ProFormSelect
              name="studentGrade"
              label="年级"
              width="sm"
              options={['2018级', '2019级', '2020级', '2021级', '2022级', '2023级']}
              rules={[{ required: true }]}
            />
            <ProFormSelect
              name="studentMajor"
              label="专业"
              width="sm"
              options={[
                { value: 0, label: '计算机' },
                { value: 1, label: '自动化' },
              ]}
              rules={[{ required: true }]}
            />
          </Space>
          <br />
          <Space size="large">
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
          <br />
          <Space size="large">
            <ProFormSelect
              name="race"
              label="民族"
              initialValue="汉族"
              width="sm"
              options={raceList}
              rules={[{ required: true }]}
            />
            <ProFormSelect
              name="studentPolitics"
              label="政治面貌"
              width="sm"
              options={politicsList}
              rules={[{ required: true }]}
            />
          </Space>
        </StepsForm.StepForm>

        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="userSetting"
          title="用户设置"
        >
          <ProFormText
            name="userAccount"
            label="账号"
            placeholder="请输入账号"
            disabled
            // tooltip="1. 用户账号不能为纯数字 2. 由数字字母（不包含特殊字符） 4-16位组成"
            // rules={[
            //   {
            //     required: true,
            //     message: '账号格式错误',
            //     pattern: /^[A-z][A-z0-9]{3,15}/,
            //   },
            // ]}
          />
          <ProFormText.Password
            name="userPassword"
            label="密码"
            placeholder="请输入密码"
            tooltip="密码中包含至少一个字母和一个数字，并且密码长度至少为 8 个字符并不超过 16 个字符"
            rules={[
              {
                required: true,
                message: '密码格式错误(长度不小于8位)',
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            label="校验密码"
            placeholder="请再次输入密码"
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
            ]}
          />
          <br />
          <ProFormTextArea name="studentProfile" label="个人简介" placeholder="请输入个人简介" />
          <ProFormTextArea name="userSlogan" label="个人签名" placeholder="请输入个性签名" />
          <ProFormTextArea name="studentSkill" label="个人技能" placeholder="请输入个人技能" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          studentHonor: honorType[];
          studentExp: expType[];
        }>
          name="personalization"
          title="个性化设置"
          onFinish={async ({ studentHonor, studentExp }) => {
            console.log(studentHonor);
            console.log(studentExp);
          }}
        >
          <ProFormCheckbox.Group
            name="studentWish"
            label="学生愿景"
            width="lg"
            options={studentWishList}
          />
          <ProFormRadio.Group
            name="studentPlan"
            label="学生未来计划"
            width="lg"
            options={studentPlanList}
          />
          <ProFormList
            copyIconProps={{
              Icon: SnippetsOutlined,
            }}
            deleteIconProps={{
              Icon: CloseOutlined,
            }}
            min={1}
            max={8}
            actionRef={actionRef}
            name="studentHonor"
            label="学生荣誉"
            initialValue={[
              {
                honor: '',
              },
            ]}
          >
            <ProFormText
              key="useMode"
              width="lg"
              name="honor"
              placeholder="输入荣誉（例子：服务外包大赛全国一等奖）"
            />
          </ProFormList>
          <ProFormList
            copyIconProps={{
              Icon: SnippetsOutlined,
            }}
            deleteIconProps={{
              Icon: CloseOutlined,
            }}
            onAfterAdd={(value) => {
              console.log(value);
            }}
            min={1}
            max={8}
            actionRef={actionRef}
            name="studentExp"
            label="个人经验"
            initialValue={[
              {
                experience: '',
              },
            ]}
          >
            <ProFormText
              key="useMode"
              width="lg"
              name="experience"
              placeholder="输入荣誉（例子：独立开发✖✖✖✖项目）"
            />
          </ProFormList>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
