// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addProject POST /hatch4tech-activity/institute/publicity/project/add */
export async function addProjectUsingPOST(
  body: API.ProjectAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-activity/institute/publicity/project/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProject POST /hatch4tech-activity/institute/publicity/project/delete */
export async function deleteProjectUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    '/hatch4tech-activity/institute/publicity/project/delete',
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

/** getProjectById GET /hatch4tech-activity/institute/publicity/project/get */
export async function getProjectByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProjectVO_>(
    '/hatch4tech-activity/institute/publicity/project/get',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** pageProject POST /hatch4tech-activity/institute/publicity/project/page/vo */
export async function pageProjectUsingPOST(
  body: API.ProjectQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProjectVO_>(
    '/hatch4tech-activity/institute/publicity/project/page/vo',
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

/** updateProject POST /hatch4tech-activity/institute/publicity/project/update */
export async function updateProjectUsingPOST(
  body: API.ProjectUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-activity/institute/publicity/project/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
