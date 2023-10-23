// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** favourActivity POST /hatch4tech-activity/activity/favour */
export async function favourActivityUsingPOST(
  body: API.ActivityFavourRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/hatch4tech-activity/activity/favour', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getFavourActivityPage POST /hatch4tech-activity/activity/favour/get */
export async function getFavourActivityPageUsingPOST(
  body: API.ActivityQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageActivityVO_>('/hatch4tech-activity/activity/favour/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** signUpActivity POST /hatch4tech-activity/activity/sign */
export async function signUpActivityUsingPOST(
  body: API.ActivitySignRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-activity/activity/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getSignUserList GET /hatch4tech-activity/activity/sign/get */
export async function getSignUserListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSignUserListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListStudentBasicInfoBO_>(
    '/hatch4tech-activity/activity/sign/get',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
