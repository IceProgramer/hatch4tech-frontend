// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addStudentWish POST /hatch4tech-user/user/student/wish/add */
export async function addStudentWishUsingPOST(
  body: API.WishAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-user/user/student/wish/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteStudentWish POST /hatch4tech-user/user/student/wish/delete */
export async function deleteStudentWishUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/wish/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listStudentWish GET /hatch4tech-user/user/student/wish/list */
export async function listStudentWishUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListStudentWishVO_>('/hatch4tech-user/user/student/wish/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** pageStudentWish POST /hatch4tech-user/user/student/wish/page/list */
export async function pageStudentWishUsingPOST(
  body: API.PageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStudentWishVO_>(
    '/hatch4tech-user/user/student/wish/page/list',
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

/** updateStudentWish POST /hatch4tech-user/user/student/wish/update */
export async function updateStudentWishUsingPOST(
  body: API.WishUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/wish/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
