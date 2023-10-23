// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addCompetition POST /hatch4tech-competition/competition/competition/add */
export async function addCompetitionUsingPOST(
  body: API.CompetitionAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-competition/competition/competition/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCompetition POST /hatch4tech-competition/competition/competition/delete */
export async function deleteCompetitionUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    '/hatch4tech-competition/competition/competition/delete',
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

/** getCompetitionVOById GET /hatch4tech-competition/competition/competition/get */
export async function getCompetitionVOByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCompetitionVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCompetitionVO_>(
    '/hatch4tech-competition/competition/competition/get',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** getCompetitionInfoList GET /hatch4tech-competition/competition/competition/info/get/list */
export async function getCompetitionInfoListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCompetitionInfoVO_>(
    '/hatch4tech-competition/competition/competition/info/get/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** pageCompetition POST /hatch4tech-competition/competition/competition/page/list */
export async function pageCompetitionUsingPOST(
  body: API.CompetitionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCompetitionVO_>(
    '/hatch4tech-competition/competition/competition/page/list',
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

/** getResourceTypeList GET /hatch4tech-competition/competition/competition/resource/type/get */
export async function getResourceTypeListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListResourceTypeVO_>(
    '/hatch4tech-competition/competition/competition/resource/type/get',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** teamSignCompetition POST /hatch4tech-competition/competition/competition/team/sign */
export async function teamSignCompetitionUsingPOST(
  body: API.CompetitionSignRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    '/hatch4tech-competition/competition/competition/team/sign',
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

/** updateCompetition POST /hatch4tech-competition/competition/competition/update */
export async function updateCompetitionUsingPOST(
  body: API.CompetitionUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    '/hatch4tech-competition/competition/competition/update',
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
