// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getUserBasicInfoById GET /hatch4tech-user/user/user/basic/info/get */
export async function getUserBasicInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserBasicInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserBasicInfoBO_>('/hatch4tech-user/user/user/basic/info/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getCurrentUser GET /hatch4tech-user/user/user/current */
export async function getCurrentUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserInfoInTokenBO_>('/hatch4tech-user/user/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** deleteUserByIds POST /hatch4tech-user/user/user/delete */
export async function deleteUserByIdsUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUserStatus POST /hatch4tech-user/user/user/status/update */
export async function updateUserStatusUsingPOST(
  body: API.UserStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/user/status/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
