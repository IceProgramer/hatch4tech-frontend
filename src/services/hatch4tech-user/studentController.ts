// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** deleteStudentById POST /hatch4tech-user/user/student/delete */
export async function deleteStudentByIdUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getStudentInfoById GET /hatch4tech-user/user/student/get/info */
export async function getStudentInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseStudentInfoVO_>('/hatch4tech-user/user/student/get/info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listStudentPlan GET /hatch4tech-user/user/student/new/plan/list */
export async function listStudentPlanUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListPlanVO_>('/hatch4tech-user/user/student/new/plan/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listStudentPolitics GET /hatch4tech-user/user/student/new/politics/list */
export async function listStudentPoliticsUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListPoliticsVO_>(
    '/hatch4tech-user/user/student/new/politics/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** listStudentRace GET /hatch4tech-user/user/student/new/race/list */
export async function listStudentRaceUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRaceVO_>('/hatch4tech-user/user/student/new/race/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** checkStudentNumber POST /hatch4tech-user/user/student/new/student/number/check */
export async function checkStudentNumberUsingPOST(
  body: API.StudentNumberRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    '/hatch4tech-user/user/student/new/student/number/check',
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

/** newStudentRegister POST /hatch4tech-user/user/student/new/student/register */
export async function newStudentRegisterUsingPOST(
  body: API.StudentRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-user/user/student/new/student/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getStudentPage POST /hatch4tech-user/user/student/page/list */
export async function getStudentPageUsingPOST(
  body: API.StudentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentInfoVO_>('/hatch4tech-user/user/student/page/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateStudentInfo POST /hatch4tech-user/user/student/update/info */
export async function updateStudentInfoUsingPOST(
  body: API.StudentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/update/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
