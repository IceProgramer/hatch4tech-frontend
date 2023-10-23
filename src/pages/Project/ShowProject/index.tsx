import { pagePublicityUsingPOST } from '@/services/hatch4tech-activity/institutePublicityController';
import { Card, Divider, Input, List, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from "@umijs/max";
const { Search } = Input;

const ShowProject: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 10,
  };

  const [searchParam, setSearchParam] = useState<API.PublicityQueryRequest>({ ...initSearchParam });
  const [total, setTotal] = useState<number>();
  const [publicityList, setPublicityList] = useState<API.PublicityVO[]>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const getPublicityList = async () => {
    setSearchLoading(true);
    try {
      const res = await pagePublicityUsingPOST(searchParam);
      if (res.code === 0) {
        setPublicityList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      console.log(error.message);
    }
    setSearchLoading(false);
  };

  function getCurrentStatus(end: any) {
    const endTime = new Date(end);
    const currentTime = new Date();
    if (currentTime >= endTime) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    getPublicityList();
  }, [searchParam]);
  return (
    <div style={{ width: '80%', margin: '0 100px' }}>
      <Search
        placeholder="请输入搜索内容"
        className="search"
        enterButton="搜索"
        size="large"
        loading={searchLoading}
        onSearch={(value) => {
          // 设置搜索信息
          setSearchParam({
            ...initSearchParam,
            searchText: value,
          });
        }}
      />
      <Divider />
      <Card>
        <List
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
          dataSource={publicityList}
          renderItem={(publicity) => (
            <List.Item>
              <List.Item.Meta
                title={<a onClick={() => {history.push(`/college/publicity/info/${publicity.id}`)}}>{publicity.publicityName}</a>}
                description={`公示时间： ${publicity.startTime} ~ ${publicity.endTime}`}
              />
              <Steps
                style={{ marginTop: 8 }}
                type="inline"
                current={getCurrentStatus(publicity.endTime)}
                items={[
                  {
                    title: '开始公示',
                    subTitle: publicity.startTime,
                  },
                  {
                    title: '结束公示',
                    subTitle: publicity.endTime,
                  },
                ]}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ShowProject;
