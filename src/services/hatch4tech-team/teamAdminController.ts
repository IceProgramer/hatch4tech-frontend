// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getTagInfoPage POST /hatch4tech-team/admin/team/tag/page/list */
export async function getTagInfoPageUsingPOST(
  body: API.TagAdminRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTagInfoVO_>('/hatch4tech-team/admin/team/tag/page/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
