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

const { Text } = Typography;
const { Dragger } = Upload;

interface Option {
  value: number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 1,
    label: 'SCI收录',
    children: [
      {
        value: 1,
        label: '一区/二区',
      },
      {
        value: 2,
        label: '三区/四区',
      },
    ],
  },
  {
    value: 3,
    label: '核心期刊',
  },
  {
    value: 4,
    label: '一般期刊',
  },
];
const PaperPoints: React.FC = () => {
  const [fileUrlList, setFileUrlList] = useState<string[]>([]);
  const [paperType, setPaperType] = useState([1, 1]);
  const [paperName, setPaperName] = useState<string>();
  const [paperClass, setPaperClass] = useState<number>(1);
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

  /**
   * 更改论文种类
   * @param value
   */
  const onChange = (value: any) => {
    setPaperType(value);
  };

  const onSubmit = async () => {
    if (!paperName) {
      message.error('论文名称为空');
    }

    const paperTypeNum = paperType.length === 1 ? paperType[0] : paperType[1];

    const applyPointRequest: API.PointExchangeApplyRequest = {
      projectName: paperName,
      pointRule: [paperTypeNum, paperClass],
      fileUrl: fileUrlList,
      memberPlace: 1,
      pointWeight: 1,
      pointType: 3,
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
            defaultValue={[1, 2]}
            placeholder="请选择论文种类"
            allowClear={false}
          />
        </Space>
        <Space size="large">
          <Text>论文分区：</Text>
          <Segmented
            size="large"
            options={[
              { label: '一作', value: '1' },
              { label: '二作', value: '2' },
              { label: '三作', value: '3', disabled: paperType[0] !== 1 || paperType[1] !== 1 },
            ]}
            onChange={(value: any) => {
              setPaperClass(value)
            }}
          />
        </Space>
        <Space size="large">
          <Text>论文名称：</Text>
          <Input
            placeholder="请输入论文名称"
            style={{ minWidth: 500 }}
            onChange={(e) => {
              setPaperName(e.target.value);
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

export default PaperPoints;
