import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { userLoginUsingPOST } from '@/services/hatch4tech-auth/loginController';
import { getCurrentUserUsingGET } from '@/services/hatch4tech-user/userController';
import { Helmet, Link } from '@@/exports';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Alert, Col, Divider, message, Modal, Row, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
// import { history } from "@umijs/max";

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  /**
   * 获取用户登录信息
   */
  const fetchUserInfo = async () => {
    const userInfo = await getCurrentUserUsingGET();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s: any) => ({
          ...s,
          currentUser: userInfo.data,
        }));
      });
    }
  };

  /**
   * 登录
   * @param values
   */
  const handleSubmit = async (values: API.LoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        if (res?.data?.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken);
        }
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="大学生科技创新平台"
          subTitle={'大学生科技创新平台 帮助每一个圣光机学子实现自己的梦想'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'mobile',
                label: '手机号登录',
                disabled: true,
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入学号'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder={'请输入手机号！'}
                rules={[
                  {
                    required: true,
                    message: '手机号是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  if (!result) {
                    return;
                  }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Row>
              <Col span={8}>
                <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox>
              </Col>
              <Col span={10} offset={6}>
                <Space size={'small'}>
                  <Link
                    style={{
                      float: 'right',
                    }}
                    to="/user/forget"
                  >
                    忘记密码 ?
                  </Link>
                  <Divider type="vertical" />
                  <Link
                    style={{
                      float: 'right',
                    }}
                    to="/user/register"
                  >
                    注册
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        </LoginForm>
      </div>
      <Footer />
      <Modal
        title="网站通知"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <p>我们非常感谢您的参与和支持，感谢您一直以来对我们的网站的支持和信任。我们非常高兴有机会与您分享我们网站的最新动态</p>
        <p>为了给大家带来更好的体验，需用户重新注册个人学生信息，以便进行必要的维护和升级。我们深知这可能会给您带来不便，但请您理解。</p>
        <p>第一次活动报名数据并没有消失，所有已上传的数据都将保持完整和安全，将会在期末进行公示</p>
        <p>同时，挑战杯结果已在竞赛模块中公示，所有同学均可查看</p>
        <p>感谢您对我们网站的支持</p>
      </Modal>
    </div>
  );
};
export default Login;
