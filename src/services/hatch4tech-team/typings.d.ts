declare namespace API {
  type ApplyHandleRequest = {
    applyId?: number;
    failedMessage?: string;
    handleStatus?: number;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
    success?: boolean;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageTagInfoVO_ = {
    code?: number;
    data?: PageTagInfoVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageTeamApplyVO_ = {
    code?: number;
    data?: PageTeamApplyVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageTeamVO_ = {
    code?: number;
    data?: PageTeamVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageUserApplyVO_ = {
    code?: number;
    data?: PageUserApplyVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponseTeamVO_ = {
    code?: number;
    data?: TeamVO;
    message?: string;
    success?: boolean;
  };

  type CompetitionBasicInfoBO = {
    competitionName?: string;
    id?: number;
    memberNum?: number;
  };

  type CreateUserVO = {
    userAvatar?: string;
    userHonor?: string[];
    userId?: number;
    userName?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getTeamInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type JoinTeamRequest = {
    tagId?: number;
    teamId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type PageTagInfoVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: TagInfoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTeamApplyVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: TeamApplyVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTeamVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: TeamVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserApplyVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: UserApplyVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type TagAdminRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tagId?: number;
    tagIds?: number[];
    tagName?: string;
    teamId?: number;
  };

  type TagInfoVO = {
    hasNum?: number;
    tagId?: number;
    tagName?: string;
    tagNum?: number;
    tagStudents?: TagStudentVO[];
    teamId?: number;
    teamName?: string;
  };

  type TagStudentVO = {
    userAvatar?: string;
    userId?: number;
    userName?: string;
  };

  type TeamApplyRequest = {
    applyStatus?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tagId?: number;
    teamId?: number;
  };

  type TeamApplyVO = {
    applyStatus?: number;
    failedMessage?: string;
    id?: number;
    tagId?: number;
    tagName?: string;
    teamId?: number;
    teamName?: string;
    userAvatar?: string;
    userId?: number;
    userName?: string;
  };

  type TeamCreateRequest = {
    maxNum?: number;
    slogan?: string;
    tagName?: string;
    teacherIds?: number[];
    teamDescript?: string;
    teamImg?: string;
    teamName?: string;
    teamTags?: TeamTagRequest[];
  };

  type TeamMemberVO = {
    memberAvatar?: string;
    memberId?: number;
    memberName?: string;
    memberTag?: string;
  };

  type TeamQueryRequest = {
    competitionId?: number;
    current?: number;
    ids?: number[];
    memberId?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tag?: string;
    teacherId?: number;
    userId?: number;
  };

  type TeamQuitRequest = {
    teamId?: number;
  };

  type TeamTagRequest = {
    tagId?: number;
    tagName?: string;
    tagNum?: number;
  };

  type TeamTagVO = {
    hasNum?: number;
    tagId?: number;
    tagName?: string;
    tagNum?: number;
  };

  type TeamTeacherVO = {
    teacherAvatar?: string;
    teacherName?: string;
    teacherTitle?: string;
    userId?: number;
  };

  type TeamUpdateRequest = {
    competitionId?: number;
    id?: number;
    maxNum?: number;
    teacherIds?: number[];
    teamDescript?: string;
    teamName?: string;
    teamTags?: TeamTagRequest[];
  };

  type TeamVO = {
    competitionInfo?: CompetitionBasicInfoBO;
    createTime?: string;
    createUser?: CreateUserVO;
    hasApply?: boolean;
    hasNum?: number;
    maxNum?: number;
    slogan?: string;
    teacherInfoList?: TeamTeacherVO[];
    teamDescript?: string;
    teamId?: number;
    teamImg?: string;
    teamMember?: TeamMemberVO[];
    teamName?: string;
    teamStatus?: number;
    teamTags?: TeamTagVO[];
  };

  type UserApplyVO = {
    applyStatus?: number;
    createUser?: CreateUserVO;
    failedMessage?: string;
    id?: number;
    tagName?: string;
    teamId?: number;
    teamImg?: string;
    teamName?: string;
    teamStatus?: number;
  };
}
