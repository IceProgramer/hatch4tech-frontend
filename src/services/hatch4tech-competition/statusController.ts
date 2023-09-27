// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addStatus POST /hatch4tech-competition/competition/status/add */
export async function addStatusUsingPOST(
  body: API.StatusAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-competition/competition/status/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteStatus POST /hatch4tech-competition/competition/status/delete */
export async function deleteStatusUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-competition/competition/status/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** pageStatusVO POST /hatch4tech-competition/competition/status/page/list */
export async function pageStatusVOUsingPOST(
  body: API.StatusQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStatusVO_>(
    '/hatch4tech-competition/competition/status/page/list',
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

/** updateStatus POST /hatch4tech-competition/competition/status/update */
export async function updateStatusUsingPOST(
  body: API.StatusUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-competition/competition/status/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
