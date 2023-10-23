// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addPublicity POST /hatch4tech-activity/institute/publicity/add */
export async function addPublicityUsingPOST(
  body: API.PublicityAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-activity/institute/publicity/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePublicity POST /hatch4tech-activity/institute/publicity/delete */
export async function deletePublicityUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-activity/institute/publicity/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPublicityById GET /hatch4tech-activity/institute/publicity/get */
export async function getPublicityByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicityByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePublicityVO_>('/hatch4tech-activity/institute/publicity/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pagePublicity POST /hatch4tech-activity/institute/publicity/page/vo */
export async function pagePublicityUsingPOST(
  body: API.PublicityQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePagePublicityVO_>(
    '/hatch4tech-activity/institute/publicity/page/vo',
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

/** updatePublicity POST /hatch4tech-activity/institute/publicity/update */
export async function updatePublicityUsingPOST(
  body: API.PublicityUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-activity/institute/publicity/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
