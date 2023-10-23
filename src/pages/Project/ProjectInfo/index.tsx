import { getPublicityByIdUsingGET } from '@/services/hatch4tech-activity/institutePublicityController';
import { pageProjectUsingPOST } from '@/services/hatch4tech-activity/publicityProjectController';
import { useParams } from '@@/exports';
import { LightFilter, ProColumns, ProTable } from '@ant-design/pro-components';
import { Card, message, Select, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Paragraph, Title } = Typography;

type ProjectItem = {
  id: number;
  projectName: string;
  userName: string;
  userStudentNumber: string,
  teacherName: string[];
  projectType: number;
};
const ProjectInfo: React.FC = () => {
  const params = useParams();

  const initSearchParam = {
    current: 1,
    pageSize: 10,
    publicityId: parseInt(params.id as string),
  };
  const [searchParam, setSearchParam] = useState<API.ProjectQueryRequest>({ ...initSearchParam });
  const [projectList, setProjectList] = useState<API.ProjectVO[]>();
  const [publicity, setPublicity] = useState<API.PublicityVO>();
  const [total, setTotal] = useState<number>();

  const getProjectList = async () => {
    try {
      const res = await pageProjectUsingPOST(searchParam);
      if (res.code === 0) {
        setProjectList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const getPublicity = async () => {
    try {
      if (params.id) {
        const id = parseInt(params.id);
        const res = await getPublicityByIdUsingGET({ id });
        if (res.code === 0) {
          setPublicity(res.data);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProjectList();
    getPublicity();
  }, [searchParam]);

  const columns: ProColumns<ProjectItem>[] = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      width: '30%',
    },
    {
      title: '项目负责人',
      dataIndex: 'userName',
      valueType: 'text',
      width: '30%',
      align: 'center',
    },
    {
      title: '负责人学号',
      dataIndex: 'userStudentNumber',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '指导老师',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center',
      render: (_, { teacherName }) => (
        <>
          {teacherName.map((teacher) => {
            return <Tag key={teacher}>{teacher.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: '组别',
      dataIndex: 'projectType',
      render: (_, { projectType }) => {
        if (projectType === 0) {
          return <Tag color="cyan">软件类</Tag>;
        }
        return <Tag color="blue">硬件类</Tag>;
      },
    },
  ];

  return (
    <div style={{ width: '80%', margin: '0 100px' }}>
      <Card>
        <Title level={3} style={{ textAlign: 'center', color: 'red' }}>
          {publicity?.publicityName}
        </Title>
        <Paragraph style={{ marginTop: 50, fontSize: 15 }}>{publicity?.publicityText}</Paragraph>
        <Paragraph style={{marginTop: 10, textAlign: "end"}}>{publicity?.publicityInstitute}</Paragraph>
        <Paragraph style={{marginTop: 10, textAlign: "end"}}>{publicity?.createTime}</Paragraph>

        <Card>
          <ProTable<ProjectItem>
            columns={columns}
            pagination={{
              onChange: (page, pageSize) => {
                console.log(page);
                setSearchParam({
                  ...searchParam,
                  current: page,
                  pageSize,
                });
              },
              pageSize: searchParam.pageSize,
              current: searchParam.current,
              total: total,
            }}
            dataSource={projectList as ProjectItem[]}
            rowKey="id"
            search={false}
            form={{
              ignoreRules: false,
            }}
            dateFormatter="string"
            // headerTitle="高级表格"
            toolbar={{
              search: {
                onSearch: (value: string) => {
                  // 设置搜索信息
                  setSearchParam({
                    ...initSearchParam,
                    searchText: value,
                  });
                },
              },
              filter: (
                <LightFilter>
                  <Select
                    defaultValue={0}
                    style={{ width: 120 }}
                    onChange={(value: number) => {
                      // 设置搜索信息
                      setSearchParam({
                        ...initSearchParam,
                        studentType: value,
                      });
                    }}
                    options={[
                      { value: 0, label: '本科生组' },
                      { value: 1, label: '研究生组' },
                    ]}
                  />
                </LightFilter>
              ),
            }}
          />
        </Card>
      </Card>
    </div>
  );
};

export default ProjectInfo;
