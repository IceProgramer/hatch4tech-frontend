// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** userLogin POST /hatch4tech-auth/user/user/login */
export async function userLoginUsingPOST(body: API.LoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseTokenInfoVO_>('/hatch4tech-auth/user/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** loginOut POST /hatch4tech-auth/user/user/logout */
export async function loginOutUsingPOST(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-auth/user/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
