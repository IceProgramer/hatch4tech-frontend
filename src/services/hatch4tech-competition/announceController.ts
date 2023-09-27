// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** createAnnounce POST /hatch4tech-competition/competition/announce/add */
export async function createAnnounceUsingPOST(
  body: API.AnnounceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-competition/competition/announce/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteAnnounce POST /hatch4tech-competition/competition/announce/delete */
export async function deleteAnnounceUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-competition/competition/announce/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAnnounceById GET /hatch4tech-competition/competition/announce/get */
export async function getAnnounceByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAnnounceByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAnnounceVO_>('/hatch4tech-competition/competition/announce/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageAnnounce POST /hatch4tech-competition/competition/announce/page/list */
export async function pageAnnounceUsingPOST(
  body: API.AnnounceQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageAnnounceVO_>(
    '/hatch4tech-competition/competition/announce/page/list',
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

/** updateAnnounce POST /hatch4tech-competition/competition/announce/update */
export async function updateAnnounceUsingPOST(
  body: API.AnnounceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-competition/competition/announce/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
