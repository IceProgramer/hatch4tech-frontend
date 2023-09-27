// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getAcademyList GET /hatch4tech-user/user/teacher/academy/get/list */
export async function getAcademyListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAcademyVO_>('/hatch4tech-user/user/teacher/academy/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getDegreeList GET /hatch4tech-user/user/teacher/degree/get/list */
export async function getDegreeListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDegreeVO_>('/hatch4tech-user/user/teacher/degree/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** deleteTeacher POST /hatch4tech-user/user/teacher/delete */
export async function deleteTeacherUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/teacher/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTeacherInfoById GET /hatch4tech-user/user/teacher/get/info */
export async function getTeacherInfoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTeacherInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTeacherVO_>('/hatch4tech-user/user/teacher/get/info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getTeacherInfoList GET /hatch4tech-user/user/teacher/info/get/list */
export async function getTeacherInfoListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListTeacherInfoVO_>(
    '/hatch4tech-user/user/teacher/info/get/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** pageTeacherInfo POST /hatch4tech-user/user/teacher/page/list */
export async function pageTeacherInfoUsingPOST(
  body: API.TeacherQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTeacherVO_>('/hatch4tech-user/user/teacher/page/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getPositionList GET /hatch4tech-user/user/teacher/position/get/list */
export async function getPositionListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListPositionVO_>(
    '/hatch4tech-user/user/teacher/position/get/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** updateTeacher POST /hatch4tech-user/user/teacher/update */
export async function updateTeacherUsingPOST(
  body: API.TeacherUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/teacher/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
