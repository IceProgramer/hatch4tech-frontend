import FILE_STATUS from '@/enums/BizFileEnum';
import { uploadFileUsingPOST } from '@/services/hatch4tech-biz/fileController';
import { applyPointUsingPOST } from '@/services/hatch4tech-biz/pointExchangeController';
import { InboxOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Input,
  InputNumber,
  message,
  Segmented,
  Space,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import type { DefaultOptionType } from 'antd/es/cascader';
import React, { useState } from 'react';

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
    label: '重点竞赛',
    children: [
      {
        value: 1,
        label: '中国国际“互联网+”大学生创新创业大赛',
      },
      {
        value: 2,
        label: '“挑战杯”全国大学生课外学术科技作品竞赛',
      },
      {
        value: 3,
        label: '“挑战杯”中国大学生创业计划竞赛',
      },
    ],
  },
  {
    value: 2,
    label: 'A类科技竞赛',
    children: [
      {
        value: 1,
        label: '中国大学生服务外包创新创业大赛',
      },
      {
        value: 2,
        label: '全国大学生数学建模竞赛',
      },
    ],
  },
  {
    value: 3,
    label: 'B类科技竞赛',
    children: [
      {
        value: 1,
        label: '中国大学生计算机设计大赛',
      },
      {
        value: 2,
        label: '中国机器人大赛暨RoboCup机器人世界杯中国赛',
      },
    ],
  },
  {
    value: 4,
    label: '其他普通竞赛',
    children: [
      {
        value: 1,
        label: '蓝桥杯全国软件和信息技术专业人才大赛',
      },
      {
        value: 2,
        label: '阿里云天池比赛',
      },
    ],
  },
];

const CompetitionPoints: React.FC = () => {
  const [competitionClass, setCompetitionClass] = useState<number>(1);
  const [competitionType, setCompetitionType] = useState<number>(0);
  const [competitionName, setCompetitionName] = useState<string>();
  const [competitionPrize, setCompetitionPrize] = useState<number>(1);
  const [projectName, setProjectName] = useState<string>();
  const [memberPlace, setMemberPlace] = useState<number>(1);
  const [teamMemberNum, setTeamMemberNum] = useState<number>(5);
  const [fileUrlList, setFileUrlList] = useState<string[]>([]);
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
    if (!competitionName) {
      message.error('请选择竞赛种类')
      return;
    }
    // 校验是否为空
    if (!projectName) {
      message.error('项目名称未填写');
      return;
    }
    let pointWeight = 1;
    // 判断权重
    // 队伍人数超过5人
    if (teamMemberNum > 5) {
      if (memberPlace / teamMemberNum <= 0.3) {
        // 获取满分
        pointWeight = 1;
      } else if (memberPlace / teamMemberNum <= 0.6) {
        // 获取80%
        pointWeight = 0.8;
      } else {
        pointWeight = 0.6;
      }
    }
    // 队伍人数少于5人
    if (teamMemberNum <= 5) {
      if (memberPlace === 1) {
        pointWeight = 1;
      } else {
        pointWeight = 0.8;
      }
    }

    const pointRule: number[] = [competitionClass, competitionType, competitionPrize];

    const applyPointRequest: API.PointExchangeApplyRequest = {
      projectName: competitionName + ' - ' + projectName,
      memberPlace: memberPlace,
      pointRule,
      fileUrl: fileUrlList,
      pointWeight,
      pointType: 1,
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
          <Text>竞赛等级：</Text>
          <Segmented
            size="large"
            options={[
              { label: '国际', value: '0' },
              { label: '全国', value: '1' },
              { label: '省级', value: '2' },
              { label: '校级', value: '3' },
              { label: '院级', value: '4' },
            ]}
            onChange={(value: any) => {
              setCompetitionType(parseInt(value));
            }}
          />
          <Space style={{ width: '100%' }}>
            <Text style={{ marginLeft: 20 }}>竞赛种类：</Text>
            <Cascader
              style={{ width: 250 }}
              options={options}
              placeholder="请选择竞赛种类"
              onChange={(value: any) => {
                setCompetitionClass(parseInt(value[0]));
                const selectOption = options.filter((option) => option.value === value[0])[0].children
                const name = selectOption?.filter((option) => option.value === value[1])[0].label ?? '';
                setCompetitionName(name)
              }}
              allowClear={false}
            />
          </Space>
        </Space>
        <Space size="large">
          <Text>竞赛成果：</Text>
          <Segmented
            size="large"
            options={[
              { label: '一等奖', value: '1' },
              { label: '二等奖', value: '2' },
              { label: '三等奖', value: '3' },
              { label: '成功参赛/鼓励奖', value: '4' },
            ]}
            onChange={(value: any) => {
              setCompetitionPrize(parseInt(value));
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
        <Space size={40}>
          <Space>
            <Text>团队位次：</Text>
            <InputNumber
              addonBefore={<UserOutlined />}
              min={1}
              max={15}
              defaultValue={1}
              onChange={(value: any) => {
                setMemberPlace(value);
              }}
            />
          </Space>
          <Space>
            <Text>队伍总人数：</Text>
            <InputNumber
              addonBefore={<UserOutlined />}
              min={1}
              max={20}
              defaultValue={5}
              onChange={(value: any) => {
                setTeamMemberNum(value);
              }}
            />
          </Space>
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

export default CompetitionPoints;
