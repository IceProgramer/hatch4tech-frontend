// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** favourCompetition POST /hatch4tech-competition/competition/favour */
export async function favourCompetitionUsingPOST(
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

/** getFavourCompetitionPage POST /hatch4tech-competition/competition/favour/get */
export async function getFavourCompetitionPageUsingPOST(
  body: API.CompetitionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCompetitionVO_>(
    '/hatch4tech-competition/competition/favour/get',
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
