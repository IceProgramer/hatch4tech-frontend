// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** favourActivity POST /hatch4tech-competition/competition/favour */
export async function favourActivityUsingPOST(
  body: API.CompetitionFavourRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/hatch4tech-competition/competition/favour', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
