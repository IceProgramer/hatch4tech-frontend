import FILE_STATUS from '@/enums/BizFileEnum';
import { uploadFileUsingPOST } from '@/services/hatch4tech-biz/fileController';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Input, message, Segmented, Space, Typography, Upload, UploadProps } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import React, { useState } from 'react';
import { applyPointUsingPOST } from "@/services/hatch4tech-biz/pointExchangeController";

const { Text } = Typography;
const { Dragger } = Upload;

const PatentPoints: React.FC = () => {
  const [fileUrlList, setFileUrlList] = useState<string[]>([]);
  const [patentType, setPatentType] = useState<number>(1);
  const [memberPlace, setMemberPlace] = useState<number>(1);
  const [patentName, setPatentName] = useState<string>();
  const [ban, setBan] = useState<boolean>(false);

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
    if (!patentName) {
      message.error('专利名称为空');
      return;
    }
    const pointWeight = memberPlace === 1 ? 1 : 0.6;

    const applyPointRequest: API.PointExchangeApplyRequest = {
      projectName: patentName,
      pointRule: [patentType],
      fileUrl: fileUrlList,
      memberPlace: memberPlace,
      pointWeight,
      pointType: 5,
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
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ marginTop: 10 }}>
        <Space size="large">
          <Text>专利类型：</Text>
          <Segmented
            size="large"
            options={[
              { label: '发明专利', value: '1' },
              { label: '实用新型专利', value: '2' },
            ]}
            onChange={(value: any) => {
              setPatentType(value);
            }}
          />
        </Space>
        <Space size="large">
          <Text>作者位次：</Text>
          <Segmented
            size="large"
            options={[
              { label: '第一作者', value: '1' },
              { label: '第二作者', value: '2' },
            ]}
            onChange={(value: any) => {
              setMemberPlace(value);
            }}
          />
        </Space>
        <Space size="large">
          <Text>专利名称：</Text>
          <Input
            placeholder="请输入专利名称"
            style={{ minWidth: 500 }}
            onChange={(e) => {
              setPatentName(e.target.value);
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

export default PatentPoints;
