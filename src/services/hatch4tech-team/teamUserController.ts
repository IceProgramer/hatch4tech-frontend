// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** applyJoinTeam POST /hatch4tech-team/team/user/apply/join */
export async function applyJoinTeamUsingPOST(
  body: API.JoinTeamRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-team/team/user/apply/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** applyJoinTeamPage POST /hatch4tech-team/team/user/apply/page */
export async function applyJoinTeamPageUsingPOST(
  body: API.TeamApplyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTeamApplyVO_>('/hatch4tech-team/team/user/apply/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** handleTeamApply POST /hatch4tech-team/team/user/past/apply/handle */
export async function handleTeamApplyUsingPOST(
  body: API.ApplyHandleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-team/team/user/past/apply/handle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** pastApplyJoinTeamPage POST /hatch4tech-team/team/user/past/apply/page */
export async function pastApplyJoinTeamPageUsingPOST(
  body: API.PageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserApplyVO_>('/hatch4tech-team/team/user/past/apply/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** quitTeam POST /hatch4tech-team/team/user/quit */
export async function quitTeamUsingPOST(
  body: API.TeamQuitRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-team/team/user/quit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
