// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** applyPoint POST /hatch4tech-biz/shop/point/exchange/apply */
export async function applyPointUsingPOST(
  body: API.PointExchangeApplyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-biz/shop/point/exchange/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
