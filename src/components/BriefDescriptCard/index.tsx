import ExpTable from '@/components/BriefDescriptCard/ExpTable';
import HonorTable from '@/components/BriefDescriptCard/HonorTable';
import { getStudentInfoByIdUsingGET } from '@/services/hatch4tech-user/studentController';
import { addStudentHonorsUsingPOST } from '@/services/hatch4tech-user/studentHonorController';
import { useModel } from '@@/exports';
import {
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  FileAddOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { FormListActionType, ProFormList, ProFormText } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import {
  Card,
  ConfigProvider,
  Dropdown,
  MenuProps,
  message,
  Modal,
  Space,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { addStudentExpsUsingPOST } from "@/services/hatch4tech-user/studentExpController";

const { Paragraph, Text } = Typography;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const BriefDescriptCard: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [userInfo, setUserInfo] = useState<API.StudentInfoVO>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [expVisit, setExpVisit] = useState<boolean>(false);
  const [expAddVisit, setExpAddVisit] = useState<boolean>(false);
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  const [honorAddVisit, setHonorAddVisit] = useState<boolean>(false);

  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: (
        <a
          onClick={() => {
            setModalVisit(true);
          }}
        >
          修改信息
        </a>
      ),
      icon: <EditOutlined />,
    },
    {
      key: '2',
      label: (
        <a
          onClick={() => {
            setHonorAddVisit(true);
          }}
        >
          添加荣誉
        </a>
      ),
      icon: <FileAddOutlined />,
    },
  ];

  const getUserInfo = async () => {
    try {
      const id = currentUser?.userId;
      const res = await getStudentInfoByIdUsingGET({ id });
      if (res.code === 0) {
        setUserInfo(res.data);
        if (res.data) {
          const medalImgList = res.data.studentMedals?.map((medal) => {
            return {
              uid: medal.medalName ?? '',
              name: medal.medalName ?? '',
              url: medal.medalImg ?? '',
            };
          });
          setFileList(medalImgList);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!modalVisit && !expVisit && !honorAddVisit && !expAddVisit) {
      getUserInfo().then();
    }
  }, [modalVisit, expVisit, honorAddVisit, expAddVisit]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name + '  勋章');
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            borderRadius: 0,
          },
        }}
      >
        <Space style={{ width: '100%' }} size={20} direction="vertical">
          <Card title="我的勋章" hoverable>
            <Space>
              <Upload
                listType="picture-circle"
                showUploadList={{ showRemoveIcon: false }}
                fileList={fileList}
                onPreview={handlePreview}
              />
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
              >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Space>
          </Card>
          <Card
            title="个人荣誉"
            hoverable
            extra={
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    编辑
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            }
          >
            <Paragraph>
              <ul>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ display: 'flex', height: 85 }}
                  wrap
                >
                  {userInfo?.studentHonor?.map((honor) => (
                    <li key={honor.honorId}>
                      <Text>{honor.honorName}</Text>
                    </li>
                  ))}
                </Space>
              </ul>
            </Paragraph>
          </Card>
          <Card
            title="个人经验"
            hoverable
            extra={
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'edit',
                      label: (
                        <a
                          onClick={() => {
                            setExpVisit(true);
                          }}
                        >
                          修改信息
                        </a>
                      ),
                      icon: <EditOutlined />,
                    },
                    {
                      key: '2',
                      label: (
                        <a
                          onClick={() => {
                            setExpAddVisit(true);
                          }}
                        >
                          添加荣誉
                        </a>
                      ),
                      icon: <FileAddOutlined />,
                    },
                  ],
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    编辑
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            }
          >
            <Paragraph>
              <ul>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ display: 'flex', height: 85 }}
                  wrap
                >
                  {userInfo?.studentExp?.map((exp) => (
                    <li key={exp.expId}>
                      <Text>{exp.expName}</Text>
                    </li>
                  ))}
                </Space>
              </ul>
            </Paragraph>
          </Card>
        </Space>
      </ConfigProvider>
      <Modal
        title="修改个人荣誉"
        open={modalVisit}
        onCancel={() => {
          setModalVisit(false);
        }}
        onOk={() => {
          setModalVisit(false);
        }}
      >
        <HonorTable honorList={userInfo?.studentHonor ?? []} />
      </Modal>
      <ModalForm
        title="添加个人荣誉"
        open={honorAddVisit}
        onFinish={async (value: any) => {
          console.log(value.studentHonor);
          try {
            const honorList = value.studentHonor.map((honor: any) => honor.honor);
            const res = await addStudentHonorsUsingPOST(honorList);
            if (res.code === 0) {
              message.success('添加成功');
            }
          } catch (error: any) {
            console.log(error);
          }
        }}
        onOpenChange={setHonorAddVisit}
      >
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
            rules={[{ required: true }]}
          />
        </ProFormList>
      </ModalForm>
      <Modal
        title="修改个人经验"
        open={expVisit}
        onCancel={() => {
          setExpVisit(false);
        }}
        onOk={() => {
          setExpVisit(false);
        }}
      >
        <ExpTable expList={userInfo?.studentExp ?? []} />
      </Modal>
      <ModalForm
        title="添加个人荣誉"
        open={expAddVisit}
        onFinish={async (value: any) => {
          console.log(value.studentExp);
          try {
            const expList = value.studentExp.map((exp: any) => exp.experience);
            const res = await addStudentExpsUsingPOST(expList);
            if (res.code === 0) {
              message.success('添加经验成功');
            }
          } catch (error: any) {
            console.log(error);
          }
        }}
        onOpenChange={setExpAddVisit}
      >
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
      </ModalForm>

    </>
  );
};

export default BriefDescriptCard;
