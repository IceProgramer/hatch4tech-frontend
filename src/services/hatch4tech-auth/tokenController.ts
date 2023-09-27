// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** refreshToken POST /hatch4tech-auth/user/token/refresh */
export async function refreshTokenUsingPOST(
  body: API.RefreshTokenRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTokenInfoVO_>('/hatch4tech-auth/user/token/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
