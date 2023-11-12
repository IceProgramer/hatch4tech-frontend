// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deletePointRule POST /hatch4tech-biz/shop/point/rule/delete */
export async function deletePointRuleUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-biz/shop/point/rule/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPointRuleById GET /hatch4tech-biz/shop/point/rule/get */
export async function getPointRuleByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPointRuleByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePointRuleVO_>('/hatch4tech-biz/shop/point/rule/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pagePointRule POST /hatch4tech-biz/shop/point/rule/page/vo */
export async function pagePointRuleUsingPOST(
  body: API.PointRuleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePointRuleVO_>('/hatch4tech-biz/shop/point/rule/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePointRule POST /hatch4tech-biz/shop/point/rule/update */
export async function updatePointRuleUsingPOST(
  body: API.PointRuleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-biz/shop/point/rule/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
