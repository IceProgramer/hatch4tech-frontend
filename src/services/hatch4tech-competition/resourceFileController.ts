// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addFile POST /hatch4tech-competition/competition/resource/file/add */
export async function addFileUsingPOST(body: API.FileAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/hatch4tech-competition/competition/resource/file/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteFile POST /hatch4tech-competition/competition/resource/file/delete */
export async function deleteFileUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>(
    '/hatch4tech-competition/competition/resource/file/delete',
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

/** pageFile POST /hatch4tech-competition/competition/resource/file/page/list */
export async function pageFileUsingPOST(
  body: API.FileQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageFileVO_>(
    '/hatch4tech-competition/competition/resource/file/page/list',
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
