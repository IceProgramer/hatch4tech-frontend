// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addComment POST /hatch4tech-user/user/teacher/comment/add */
export async function addCommentUsingPOST(
  body: API.CommentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-user/user/teacher/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteComment POST /hatch4tech-user/user/teacher/comment/delete */
export async function deleteCommentUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/teacher/comment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** pageComment POST /hatch4tech-user/user/teacher/comment/page/list */
export async function pageCommentUsingPOST(
  body: API.CommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCommentVO_>(
    '/hatch4tech-user/user/teacher/comment/page/list',
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

/** thumbComment POST /hatch4tech-user/user/teacher/comment/thumb */
export async function thumbCommentUsingPOST(
  body: API.CommentThumbRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/hatch4tech-user/user/teacher/comment/thumb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
