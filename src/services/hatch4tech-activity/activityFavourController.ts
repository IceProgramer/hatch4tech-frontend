// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** favourActivity POST /hatch4tech-activity/activity/favour */
export async function favourActivityUsingPOST(
  body: API.ActivityFavourRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/hatch4tech-activity/activity/favour', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
