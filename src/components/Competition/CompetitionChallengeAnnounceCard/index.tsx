import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Card, Divider, Tag, Typography } from 'antd';
import React from 'react';
import './index.less';

const { Paragraph, Title } = Typography;

type CompetitionTeamItem = {
  id: number;
  projectName: string;
  projectType: string;
  instituteName: string;
  projectClass: string;
  price: any;
  teacherNum: number;
  userName: string;
  teamMember: string[];
};

const CompetitionChallengeAnnounceCard: React.FC = () => {
  const columns: ProColumns<CompetitionTeamItem>[] = [
    {
      title: '作品名称',
      dataIndex: 'projectName',
      width: '25%',
    },
    {
      title: '项目类型',
      dataIndex: 'projectType',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '项目分组',
      dataIndex: 'projectClass',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '获奖情况',
      dataIndex: 'price',
      align: 'center',
      width: '10%',
    },
    {
      title: '指导老师数',
      dataIndex: 'teacherNum',
      align: 'center',
    },
    {
      title: '负责人姓名',
      dataIndex: 'userName',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '团队其他成员姓名',
      key: 'tags',
      dataIndex: 'teamMember',
      align: 'center',
      render: (_, { teamMember }) => (
        <>
          {teamMember.map((member) => {
            return <Tag key={member}>{member.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
  ];
  const competitionTeamList: CompetitionTeamItem[] = [
    {
      id: 1,
      projectName: '隧道之眼——基于多元异构数据源实现隧道异常风险监测',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'E. 文化创意和区域合作',
      price: <Tag color="red">一等奖</Tag>,
      teacherNum: 3,
      userName: '王则昊',
      teamMember: [
        '翁文超',
        '陈琪凯',
        '戴彧',
        '濮乐意',
        '沈曹袆',
        '陈嘉翰',
        '王志鹏',
        '蔡轩昊',
        '陈景阳',
      ],
    },
    {
      id: 2,
      projectName: '鹰眼科技--面向重大疾病辅助诊断的医学影像分析系统供应商',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'C. 数字化改革和城市治理',
      price: <Tag color="blue">二等奖</Tag>,
      teacherNum: 3,
      userName: '陈一飞',
      teamMember: [
        '邹槟峰',
        '吴越',
        '戴学舟',
        '孙逸飞',
        '黄一凡',
        '柯怡帆',
        '黄一语',
        '孔诗语',
        '邬其岑',
      ],
    },
    {
      id: 3,
      projectName: '一种基于多尺度条件生成对抗网络合成超广角荧光血管造影图像的方法研究',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'A. 科技创新和未来产业',
      price: <Tag color="blue">二等奖</Tag>,
      teacherNum: 3,
      userName: '陈章昊',
      teamMember: ['方昭杰', '于馨童', '尹与同', '张晨焱'],
    },
    {
      id: 4,
      projectName: '基于智慧云管理平台的一体式亚麻籽脱壳机',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'B. 共同富裕和乡村振兴',
      price: <Tag color="green">三等奖</Tag>,
      teacherNum: 2,
      userName: '郭鸿宇',
      teamMember: [
        '郭鸿宇',
        '李浩阳',
        '顾元圻',
        '熊天源',
        '吴正阳',
        '常朝淇',
        '边文进',
        '程炯昊',
        '张豪峻',
      ],
    },
    {
      id: 5,
      projectName: '养猪宝——基于智能猪脸识别的农户智慧养殖管理平台',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'B. 共同富裕和乡村振兴',
      price: <Tag color="green">三等奖</Tag>,
      teacherNum: 2,
      userName: '陈嘉翰',
      teamMember: [
        '陈东亮',
        '方昭杰',
        '朱冕',
        '王佳颖',
        '程炯昊',
        '金雨蝶',
        '王方蕴柔',
        '王一存',
        '吴子扬',
      ],
    },
    {
      id: 6,
      projectName: '具有安全气囊保护的智能医疗防护系统',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'A. 科技创新和未来产业',
      price: <Tag color="green">三等奖</Tag>,
      teacherNum: 1,
      userName: '熊能',
      teamMember: [
        '谢盛',
        '黄子豪',
        '卢星雨',
        '石宇凡',
        '黄笑成',
        '董晨颂',
        '洪宇杰',
        '相余赟',
        '金晓刚',
      ],
    },
    {
      id: 7,
      projectName: 'AdaptChat-基于大模型的多领域多模态智能顾问',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'E. 文化创意和区域合作',
      price: <Tag color="purple">参与奖</Tag>,
      teacherNum: 1,
      userName: '程佳',
      teamMember: ['周光哲', '仲书晗', '陈琪凯', '沈泽宇', '马宁蔚'],
    },
    {
      id: 8,
      projectName: '基于OCR的医学文献智能识别与检索系统',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'C. 数字化改革和城市治理',
      price: <Tag color="purple">参与奖</Tag>,
      teacherNum: 2,
      userName: '余潇',
      teamMember: ['吴之豪', '赫婧祺', '仇峻韬', '何金森', '陈琪凯', '孙逸飞'],
    },
    {
      id: 9,
      projectName: '电子信息产业链智慧全景监测预警平台',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'A. 科技创新和未来产业',
      price: <Tag color="purple">参与奖</Tag>,
      teacherNum: 0,
      userName: '沈曹祎',
      teamMember: ['戴彧', '濮乐意', '陈嘉翰', '王志鹏', '蔡轩昊', '陈景阳', '董沥琪'],
    },
    {
      id: 10,
      projectName: '工坊管家',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'C. 数字化改革和城市治理',
      price: <Tag color="purple">参与奖</Tag>,
      teacherNum: 1,
      userName: '张轩豪',
      teamMember: ['刘嘉寓', '杨睿涵', '陈嘉翰', '上官于笑', '刘婷'],
    },
  ];

  return (
    <>
      <div className="competitionDetail">
        <Divider orientation="left">结果公示</Divider>
        <Card>
          <Typography style={{ width: '100%' }}>
            <Title level={3} style={{ textAlign: 'center', color: 'red' }}>
              挑战杯公示
            </Title>
            <Paragraph style={{ marginTop: 50 }}>
              各单位 :
              2023年度挑战杯竞赛经过学院内的专家评比审议，确定了2023年 挑战杯 竞赛各获奖奖项
              等级，详细情况见附件。现将获奖信息予以公示
            </Paragraph>
            <Paragraph style={{ marginTop: 10, textAlign: 'end' }}>
              杭州电子科技大学圣光机学院
            </Paragraph>
            <Paragraph style={{ marginTop: 10, textAlign: 'end' }}>2023年10月28日</Paragraph>
            <ProTable<CompetitionTeamItem>
              columns={columns}
              dataSource={competitionTeamList as CompetitionTeamItem[]}
              rowKey="id"
              search={false}
              pagination={false}
              form={{
                ignoreRules: false,
              }}
              dateFormatter="string"
              // headerTitle="高级表格"
            />
          </Typography>
        </Card>
      </div>
    </>
  );
};

export default CompetitionChallengeAnnounceCard;
