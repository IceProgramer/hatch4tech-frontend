// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addMedal POST /hatch4tech-user/user/student/medal/add */
export async function addMedalUsingPOST(
  body: API.MedalAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-user/user/student/medal/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** awardMedal POST /hatch4tech-user/user/student/medal/award */
export async function awardMedalUsingPOST(
  body: API.MedalAwardRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/medal/award', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteMedal POST /hatch4tech-user/user/student/medal/delete */
export async function deleteMedalUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/medal/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getMedalPage POST /hatch4tech-user/user/student/medal/page/list */
export async function getMedalPageUsingPOST(
  body: API.MedalQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageMedalVO_>('/hatch4tech-user/user/student/medal/page/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMedal POST /hatch4tech-user/user/student/medal/update */
export async function updateMedalUsingPOST(
  body: API.MedalUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-user/user/student/medal/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
