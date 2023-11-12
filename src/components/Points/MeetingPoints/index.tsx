import FILE_STATUS from '@/enums/BizFileEnum';
import { uploadFileUsingPOST } from '@/services/hatch4tech-biz/fileController';
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Input,
  message,
  Segmented,
  Space,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import React, { useState } from 'react';
import { applyPointUsingPOST } from "@/services/hatch4tech-biz/pointExchangeController";

const { Dragger } = Upload;

const { Text } = Typography;

interface Option {
  value: number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 1,
    label: 'EI国际会议',
  },
  {
    value: 2,
    label: 'CCF会议',
    children: [
      {
        value: 2,
        label: 'A',
      },
      {
        value: 3,
        label: 'B',
      },
      {
        value: 4,
        label: 'C',
      },
    ],
  },
];
const MeetingPoints: React.FC = () => {
  const [fileUrlList, setFileUrlList] = useState<string[]>([]);
  const [meetingType, setMeetingType] = useState([1]);
  const [meetingClass, setMeetingClass] = useState<number>(1);
  const [meetingName, setMeetingName] = useState<string>();
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

  const onChange = (value: any) => {
    console.log(value);
    setMeetingType(value);
  };

  const onSubmit = async () => {
    if (!meetingName) {
      message.error('会议名称为空');
      return;
    }

    const meetingTypeNum = meetingType.length === 1 ? meetingType[0] : meetingType[1];

    const applyPointRequest: API.PointExchangeApplyRequest = {
      projectName: meetingName,
      pointRule: [meetingTypeNum, meetingClass],
      fileUrl: fileUrlList,
      memberPlace: 1,
      pointWeight: 1,
      pointType: 4,
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
          <Text>论文种类：</Text>
          <Cascader
            style={{ minWidth: 60 }}
            onChange={onChange}
            options={options}
            placeholder="请选择会议种类"
          />
        </Space>
        <Space size="large">
          <Text>论文分区：</Text>
          <Segmented
            size="large"
            options={[
              { label: '一作', value: '1' },
              { label: '二作', value: '2' },
              { label: '三作', value: '3', disabled: meetingType[0] !== 2 || meetingType[1] !== 2 },
            ]}
            onChange={(value: any) => {
              setMeetingClass(value)
            }}
          />
        </Space>
        <Space size="large">
          <Text>会议名称：</Text>
          <Input
            placeholder="请输入会议名称"
            style={{ minWidth: 500 }}
            onChange={(e) => {
              setMeetingName(e.target.value);
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

export default MeetingPoints;
