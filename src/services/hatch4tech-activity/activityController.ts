// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addActivity POST /hatch4tech-activity/activity/activity/add */
export async function addActivityUsingPOST(
  body: API.ActivityAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-activity/activity/activity/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteActivity POST /hatch4tech-activity/activity/activity/delete */
export async function deleteActivityUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-activity/activity/activity/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** pageActivity POST /hatch4tech-activity/activity/activity/page/list */
export async function pageActivityUsingPOST(
  body: API.ActivityQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageActivityVO_>(
    '/hatch4tech-activity/activity/activity/page/list',
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

/** getRewardList GET /hatch4tech-activity/activity/activity/reward/get/list */
export async function getRewardListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRewardTypeVO_>(
    '/hatch4tech-activity/activity/activity/reward/get/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** updateActivity POST /hatch4tech-activity/activity/activity/update */
export async function updateActivityUsingPOST(
  body: API.ActivityUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-activity/activity/activity/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}