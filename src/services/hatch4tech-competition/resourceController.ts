// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addResource POST /hatch4tech-competition/competition/resource/add */
export async function addResourceUsingPOST(
  body: API.ResourceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-competition/competition/resource/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteResource POST /hatch4tech-competition/competition/resource/delete */
export async function deleteResourceUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-competition/competition/resource/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getResourcePage POST /hatch4tech-competition/competition/resource/page/list */
export async function getResourcePageUsingPOST(
  body: API.ResourceQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageResourceVO_>(
    '/hatch4tech-competition/competition/resource/page/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** getResourceByTeamId GET /hatch4tech-competition/competition/resource/team/get */
export async function getResourceByTeamIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getResourceByTeamIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListResourceVO_>(
    '/hatch4tech-competition/competition/resource/team/get',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** updateResource POST /hatch4tech-competition/competition/resource/update */
export async function updateResourceUsingPOST(
  body: API.ResourceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-competition/competition/resource/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
