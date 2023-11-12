import { pageProductUsingPOST } from '@/services/hatch4tech-biz/productController';
import {
  LightFilter,
  ProDescriptions,
  ProFormDigit,
  ProFormSelect,
  StatisticCard,
} from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  List,
  message,
  Row,
  Segmented,
  Space,
  Tag,
  Typography,
} from 'antd';
import Search from 'antd/es/input/Search';
import RcResizeObserver from 'rc-resize-observer';
import React, { ReactNode, useEffect, useState } from 'react';

const { Text } = Typography;

import CompetitionPoints from '@/components/Points/CompetitionPoints';
import MeetingPoints from '@/components/Points/MeetingPoints';
import PaperPoints from '@/components/Points/PaperPoints';
import PatentPoints from '@/components/Points/PatentPoints';
import ProjectPoints from '@/components/Points/ProjectPoints';
import {
  BankTwoTone,
  ExperimentTwoTone,
  FilePptTwoTone,
  FileTextTwoTone,
  FilterOutlined,
  TrophyTwoTone,
  UploadOutlined,
} from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-form';
import Meta from 'antd/es/card/Meta';
import { getUserBasicInfoByIdUsingGET } from "@/services/hatch4tech-user/userController";
import { useModel } from "@@/exports";

const colorList = [
  'red',
  'magenta',
  'volcano',
  'orange',
  'gold',
  'lime',
  'cyan',
  'green',
  'blue',
  'geekblue',
  'purple',
];

const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

const ShowProduct: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 12,
  };
  const [searchParam, setSearchParam] = useState<API.ProductQueryRequest>({ ...initSearchParam });
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>();
  const [productList, setProductList] = useState<API.ProductVO[]>();
  const [product, setProduct] = useState<API.ProductVO>();
  const [responsive, setResponsive] = useState(false);
  const [UploadPoints, setUploadPoints] = useState<ReactNode>(<CompetitionPoints />);
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [userInfo, setUserInfo] = useState<API.UserBasicInfoBO>()
  /**
   * 获取积分商城商品
   */
  const getProductList = async () => {
    setSearchLoading(true);
    try {
      const res = await pageProductUsingPOST(searchParam);
      if (res.code === 0) {
        setProductList(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      console.log(error);
    }
    setSearchLoading(false);
  };

  /**
   * 获取用户积分数和兑换数
   */
  const getUserPoints = async () => {
    try {
      const id = currentUser?.userId as number;
      const res = await getUserBasicInfoByIdUsingGET({ id })
      if (res.code === 0) {
        setUserInfo(res.data)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserPoints().then();
    getProductList().then();
  }, [searchParam]);

  const segmentChange = (value: any) => {
    if (value === '0') {
      setUploadPoints(<CompetitionPoints />);
    }
    if (value === '1') {
      setUploadPoints(<ProjectPoints />);
    }
    if (value === '2') {
      setUploadPoints(<PaperPoints />);
    }
    if (value === '3') {
      setUploadPoints(<MeetingPoints />);
    }
    if (value === '4') {
      setUploadPoints(<PatentPoints />);
    }
  };

  return (
    <>
      <Row gutter={24}>
        <Col className="gutter-row" span={18}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Search
                placeholder="搜索竞赛信息"
                loading={searchLoading}
                enterButton="搜索"
                size="large"
                onSearch={(value) => {
                  // 设置搜索信息
                  setSearchParam({
                    ...initSearchParam,
                    searchText: value,
                  });
                }}
              />
              <Space>
                <span>搜索条件：</span>
                <LightFilter
                  bordered
                  collapseLabel={<FilterOutlined />}
                  onFinish={async (values) => {
                    setSearchParam({
                      ...searchParam,
                      productTypeList: values.productTypeList,
                      maxPoints: values.maxPoints,
                      minPoints: values.minPoints,
                    });
                    console.log(searchParam);
                  }}
                >
                  <ProFormSelect
                    label="奖品种类"
                    name="productTypeList"
                    showSearch
                    mode="multiple"
                    options={[
                      { label: '计算机', value: '计算机' },
                      { label: '自动化', value: '自动化' },
                    ]}
                    placeholder="奖品种类"
                  />
                  <ProFormDigit label="积分下限" name="minPoints" min={0} />
                  <ProFormDigit label="积分上限" name="maxPoints" min={0} />
                </LightFilter>
              </Space>
            </Space>
          </Card>
          <Divider />
          <Card>
            <List
              grid={{ gutter: 22, column: 4 }}
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
              dataSource={productList}
              renderItem={(productVO: API.ProductVO) => (
                <List.Item>
                  <Card
                    onClick={() => {
                      setProduct(productVO);
                    }}
                    hoverable
                    cover={
                      <img
                        alt={productVO.productName}
                        height={180}
                        width={240}
                        src={productVO.productImg}
                      />
                    }
                  >
                    <Meta
                      title={
                        <Text style={{ maxWidth: '100%' }} ellipsis>
                          {productVO.productName}
                        </Text>
                      }
                      description={<div>兑换积分：{productVO.productPoints}</div>}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <RcResizeObserver
              key="resize-observer"
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
                <Space>
                  <StatisticCard
                    statistic={{
                      title: '我的积分',
                      value: userInfo?.userPoints,
                      icon: (
                        <img
                          style={imgStyle}
                          src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                          alt="icon"
                        />
                      ),
                    }}
                  />
                  <ModalForm
                    submitter={false}
                    title="获取积分"
                    trigger={
                      <Button type="primary" icon={<UploadOutlined />} size={'large'}>
                        获取积分
                      </Button>
                    }
                    form={form}
                    autoFocusFirstInput
                    modalProps={{
                      destroyOnClose: true,
                    }}
                    // submitTimeout={2000}
                    onFinish={async (values) => {
                      console.log(values.name);
                      message.success('提交成功');
                      return true;
                    }}
                  >
                    <Space direction="vertical">
                      <Space size="large">
                        <Text>类别：</Text>
                        <Segmented
                          size="large"
                          options={[
                            { label: '科研竞赛', icon: <TrophyTwoTone />, value: '0' },
                            { label: '科研项目', icon: <ExperimentTwoTone />, value: '1' },
                            { label: '学术论文', icon: <FileTextTwoTone />, value: '2' },
                            { label: '国际会议', icon: <BankTwoTone />, value: '3' },
                            { label: '专利', icon: <FilePptTwoTone />, value: '4' },
                          ]}
                          onChange={segmentChange}
                        />
                      </Space>
                      {UploadPoints}
                    </Space>
                  </ModalForm>
                </Space>
                <StatisticCard
                  statistic={{
                    title: '兑换次数',
                    value: userInfo?.exchangeNum,
                    icon: (
                      <img
                        style={imgStyle}
                        src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                        alt="icon"
                      />
                    ),
                  }}
                />
              </StatisticCard.Group>
            </RcResizeObserver>
            {product ? (
              <Card cover={<img alt={product.productName} src={product.productImg} />}>
                <Space direction="vertical">
                  <ProDescriptions
                    style={{ marginTop: '15px' }}
                    column={1}
                    size="small"
                    dataSource={{
                      productPoints: product?.productPoints,
                      productTags: (
                        <>
                          {product.productTypeList?.map((tag) => (
                            <Tag key={tag} color={colorList.at(Math.random() * 11)}>
                              {tag}
                            </Tag>
                          ))}
                        </>
                      ),
                      exchangeNum: product.exchangeNum + ' 次',
                      productNum: product.productNum + ' 件',
                    }}
                    columns={[
                      {
                        title: '兑换积分',
                        dataIndex: 'productPoints',
                      },
                      {
                        title: '商品标签',
                        dataIndex: 'productTags',
                      },
                      {
                        title: '兑换次数',
                        dataIndex: 'exchangeNum',
                      },
                      {
                        title: '奖品货存',
                        dataIndex: 'productNum',
                      },
                    ]}
                  />
                  <Button type="primary" block>
                    兑换奖品
                  </Button>
                </Space>
              </Card>
            ) : (
              <Card>排行榜</Card>
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default ShowProduct;
