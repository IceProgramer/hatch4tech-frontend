// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addStudentExps POST /hatch4tech-user/user/student/exp/add */
export async function addStudentExpsUsingPOST(body: string[], options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/exp/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteStudentExp POST /hatch4tech-user/user/student/exp/delete */
export async function deleteStudentExpUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/exp/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateStudentExp POST /hatch4tech-user/user/student/exp/update */
export async function updateStudentExpUsingPOST(
  body: API.ExpUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/exp/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
