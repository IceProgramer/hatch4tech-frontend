// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addStudentHonors POST /hatch4tech-user/user/student/honor/add */
export async function addStudentHonorsUsingPOST(body: string[], options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/honor/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteStudentHonor POST /hatch4tech-user/user/student/honor/delete */
export async function deleteStudentHonorUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/honor/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateStudentHonor POST /hatch4tech-user/user/student/honor/update */
export async function updateStudentHonorUsingPOST(
  body: API.HonorUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/honor/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
