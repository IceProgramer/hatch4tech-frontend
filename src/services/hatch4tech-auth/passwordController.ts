// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** updatePassword POST /hatch4tech-auth/user/user/password/update */
export async function updatePasswordUsingPOST(
  body: API.PasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-auth/user/user/password/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
