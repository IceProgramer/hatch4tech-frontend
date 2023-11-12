import FILE_STATUS from '@/enums/BizFileEnum';
import { uploadFileUsingPOST } from '@/services/hatch4tech-biz/fileController';
import { applyPointUsingPOST } from '@/services/hatch4tech-biz/pointExchangeController';
import { InboxOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  InputNumber,
  message,
  Segmented,
  Select,
  Space,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import React, { useState } from 'react';

const { Text } = Typography;
const { Dragger } = Upload;

const ProjectPoints: React.FC = () => {
  const [fileUrlList, setFileUrlList] = useState<string[]>([]);
  const [ban, setBan] = useState<boolean>(false);
  const [projectType, setProjectType] = useState<number>(1);
  const [memberPlace, setMemberPlace] = useState<number>(1);
  const [scienceProject, setScienceProject] = useState<string>();
  const [projectName, setProjectName] = useState<string>();

  const customRemove = (file: any) => {
    const index = fileUrlList.indexOf(file);
    const newFileList = fileUrlList.slice();
    newFileList.splice(index, 1);
    setFileUrlList(newFileList);
    message.success(`文件 ${file.name} 已删除`);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange: async (info: UploadChangeParam) => {
      if (info.file.status === 'done') {
        console.log(info.file);
        try {
          const res = await uploadFileUsingPOST(
            { biz: FILE_STATUS.POINT_FILE },
            {},
            info.file.originFileObj,
          );
          if (res.code === 0) {
            const fileUrl = res.data as string;
            setFileUrlList([...fileUrlList, fileUrl]);
            message.success('文件上传成功');
          }
        } catch (error: any) {
          console.log(error);
        }
        return;
      }
    },
    onRemove: customRemove,
  };

  const onSubmit = async () => {
    if (!scienceProject) {
      message.error('请选择科研项目种类');
      return;
    }
    // 校验是否为空
    if (!projectName) {
      message.error('项目名称未填写');
      return;
    }
    // 判断权重
    let pointWeight;
    if (memberPlace === 1) {
      pointWeight = 1;
    } else {
      pointWeight = 0.6;
    }

    const applyPointRequest: API.PointExchangeApplyRequest = {
      projectName: scienceProject + ' - ' + projectName,
      memberPlace: memberPlace,
      pointRule: [projectType],
      fileUrl: fileUrlList,
      pointWeight,
      pointType: 2,
    };

    try {
      const res = await applyPointUsingPOST(applyPointRequest);
      if (res.code === 0) {
        message.success('积分申请上传成功😎');
        setBan(true);
      }
    } catch (error: any) {
      console.log(error);
    }

    console.log(applyPointRequest);
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ marginTop: 10 }}>
        <Space size="large">
          <Text>项目种类：</Text>
          <Select
            style={{ minWidth: 200 }}
            placeholder="请选择项目种类"
            options={[
              // 大创项目、新苗立项、学院立项
              { label: '大学生创新创业训练计划项目', value: '0' },
              { label: '浙江省大学生科技创新活动计划（新苗人才计划）项目', value: '1' },
              { label: '学院立项', value: '2' },
              { label: '其他立项', value: '3' },
            ]}
            onChange={(index, value: any) => {
              setScienceProject(value.label);
            }}
          />
        </Space>
        <Space size="large">
          <Text>项目种类：</Text>
          <Segmented
            size="large"
            options={[
              { label: '国家级', value: '1' },
              { label: '省级', value: '2' },
              { label: '校级', value: '3' },
              { label: '院级', value: '4' },
            ]}
            onChange={(value: any) => {
              setProjectType(parseInt(value));
            }}
          />
        </Space>
        <Space size="large">
          <Text>团队位次：</Text>
          <InputNumber
            addonBefore={<UserOutlined />}
            min={1}
            max={7}
            defaultValue={1}
            onChange={(value: any) => {
              setMemberPlace(value);
            }}
          />
        </Space>
        <Space size="large">
          <Text>项目名称</Text>
          <Input
            placeholder="请输入项目名称"
            style={{ minWidth: 500 }}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
        </Space>
        <Space>
          <Text>证明文件：</Text>
          <Dragger {...props} style={{ minWidth: 530 }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击上传证明文件</p>
            <p className="ant-upload-hint">仅支持png、jpg、jpng、word、pdf格式文件</p>
          </Dragger>
        </Space>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            disabled={ban}
            type="primary"
            size="large"
            style={{ width: 300 }}
            onClick={onSubmit}
            block
          >
            提交申请
          </Button>
        </div>
      </Space>
    </>
  );
};

export default ProjectPoints;
