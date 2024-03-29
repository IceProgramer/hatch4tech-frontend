import { getAnnounceByIdUsingGET } from '@/services/hatch4tech-competition/announceController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Card, Divider, Result, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Paragraph, Title } = Typography;

interface Props {
  competitionId: number;
}

type CompetitionTeamItem = {
  id: number;
  projectName: string;
  projectType: string;
  instituteName: string;
  projectClass: string;
  teamNum: number;
  teacherNum: number;
  userName: string;
  userPhone: string;
  teamMember: string[];
};

const CompetitionAnnounceCard: React.FC<Props> = (props) => {
  const { competitionId } = props;
  const [competitionAnnounce, setCompetitionAnnounce] = useState<API.AnnounceVO>();

  const getCompetitionAnnounce = async () => {
    try {
      const res = await getAnnounceByIdUsingGET({ competitionId });
      if (res.code === 0) {
        if (res.data) {
          setCompetitionAnnounce(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      title: '团队学生人数',
      dataIndex: 'teamNum',
      align: 'center',
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
      title: '负责人联系方式',
      dataIndex: 'userPhone',
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
      teamNum: 10,
      teacherNum: 3,
      userName: '王则昊',
      userPhone: '17858643633',
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
      teamNum: 10,
      teacherNum: 3,
      userName: '陈一飞',
      userPhone: '15228772315',
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
      teamNum: 5,
      teacherNum: 3,
      userName: '陈章昊',
      userPhone: '13777862746',
      teamMember: [
        '方昭杰',
        '于馨童',
        '尹与同',
        '张晨焱',
      ],
    },
    {
      id: 4,
      projectName: '基于智慧云管理平台的一体式亚麻籽脱壳机',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'B. 共同富裕和乡村振兴',
      teamNum: 10,
      teacherNum: 2,
      userName: '郭鸿宇',
      userPhone: '13394098821',
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
      teamNum: 10,
      teacherNum: 2,
      userName: '陈嘉翰',
      userPhone: '13706531210',
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
      teamNum: 10,
      teacherNum: 1,
      userName: '熊能',
      userPhone: '19357523582',
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
      teamNum: 6,
      teacherNum: 1,
      userName: '程佳',
      userPhone: '19357510418',
      teamMember: [
        '周光哲',
        '仲书晗',
        '陈琪凯',
        '沈泽宇',
        '马宁蔚',
      ],
    },
    {
      id: 8,
      projectName: '基于OCR的医学文献智能识别与检索系统',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'C. 数字化改革和城市治理',
      teamNum: 7,
      teacherNum: 2,
      userName: '余潇',
      userPhone: '18108191617',
      teamMember: [
        '吴之豪',
        '赫婧祺',
        '仇峻韬',
        '何金森',
        '陈琪凯',
        '孙逸飞',
      ],
    },
    {
      id: 9,
      projectName: '电子信息产业链智慧全景监测预警平台',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'A. 科技创新和未来产业',
      teamNum: 8,
      teacherNum: 0,
      userName: '沈曹祎',
      userPhone: '18329102330',
      teamMember: [
        '戴彧',
        '濮乐意',
        '陈嘉翰',
        '王志鹏',
        '蔡轩昊',
        '陈景阳',
        '董沥琪',
      ],
    },
    {
      id: 10,
      projectName: '工坊管家',
      projectType: '普通高校',
      instituteName: '圣光机学院',
      projectClass: 'C. 数字化改革和城市治理',
      teamNum: 6,
      teacherNum: 1,
      userName: '张轩豪',
      userPhone: '18757656837',
      teamMember: [
        '刘嘉寓',
        '杨睿涵',
        '陈嘉翰',
        '上官于笑',
        '刘婷',
      ],
    },
  ];

  useEffect(() => {
    getCompetitionAnnounce().then();
  }, []);
  return (
    <>
      {competitionAnnounce ? (
        <div className="competitionDetail">
          <Divider orientation="left">结果公示</Divider>
          <Card>
            <Typography style={{ width: '100%' }}>
              <Title level={3} style={{ textAlign: 'center', color: 'red' }}>
                {competitionAnnounce.announceName}
              </Title>
              <Paragraph style={{ marginTop: 50 }}>{competitionAnnounce.announceContent}</Paragraph>
              {/*<Link*/}
              {/*  style={{ marginTop: 100 }}*/}
              {/*  href={competitionAnnounce.announceFile}*/}
              {/*  target="_blank"*/}
              {/*>*/}
              {/*  <Space style={{ marginTop: 50 }}>*/}
              {/*    <DownloadOutlined />*/}
              {/*    <span>附件:{competitionAnnounce.announceName}</span>*/}
              {/*  </Space>*/}
              {/*</Link>*/}
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
              <Paragraph style={{ marginTop: 10, textAlign: 'end' }}>
                {competitionAnnounce.announceFrom}
              </Paragraph>
              <Paragraph style={{ marginTop: 10, textAlign: 'end' }}>
                {competitionAnnounce.publishTime}
              </Paragraph>
            </Typography>
          </Card>
        </div>
      ) : (
        <Card>
          <Result
            status="404"
            title="暂无公示信息发布"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  history.go(-1);
                }}
              >
                返回上一页
              </Button>
            }
          />
        </Card>
      )}
    </>
  );
};

export default CompetitionAnnounceCard;
