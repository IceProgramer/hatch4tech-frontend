// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** createTeam POST /hatch4tech-team/team/team/create */
export async function createTeamUsingPOST(
  body: API.TeamCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-team/team/team/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTeam POST /hatch4tech-team/team/team/dissolve */
export async function deleteTeamUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-team/team/team/dissolve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTeamInfoById GET /hatch4tech-team/team/team/get */
export async function getTeamInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTeamInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTeamVO_>('/hatch4tech-team/team/team/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getHistoryTeamPage POST /hatch4tech-team/team/team/list/history/page */
export async function getHistoryTeamPageUsingPOST(
  body: API.PageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTeamVO_>('/hatch4tech-team/team/team/list/history/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTeamInfoPage POST /hatch4tech-team/team/team/list/page */
export async function getTeamInfoPageUsingPOST(
  body: API.TeamQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTeamVO_>('/hatch4tech-team/team/team/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTeam POST /hatch4tech-team/team/team/update */
export async function updateTeamUsingPOST(
  body: API.TeamUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-team/team/team/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
