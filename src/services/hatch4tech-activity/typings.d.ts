declare namespace API {
  type ActivityAddRequest = {
    activityAddress?: string;
    activityDescript?: string;
    activityHost?: string;
    activityImg?: string;
    activityName?: string;
    endTime?: string;
    rewardNum?: number;
    rewardType?: number;
    startTime?: string;
  };

  type ActivityFavourRequest = {
    activityId?: number;
  };

  type ActivityQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    rewardType?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type ActivitySignRequest = {
    activityId?: number;
  };

  type ActivityUpdateRequest = {
    activityAddress?: string;
    activityDescript?: string;
    activityHost?: string;
    activityImg?: string;
    activityName?: string;
    activityStatus?: number;
    endTime?: string;
    id?: number;
    rewardNum?: number;
    rewardType?: number;
    startTime?: string;
  };

  type ActivityVO = {
    activityAddress?: string;
    activityDescript?: string;
    activityHost?: string;
    activityImg?: string;
    activityName?: string;
    activityStatus?: number;
    endTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    id?: number;
    rewardNum?: number;
    rewardType?: string;
    startTime?: string;
  };

  type BaseResponseActivityVO_ = {
    code?: number;
    data?: ActivityVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
    success?: boolean;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponseListActivityVO_ = {
    code?: number;
    data?: ActivityVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListRewardTypeVO_ = {
    code?: number;
    data?: RewardTypeVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListStudentBasicInfoBO_ = {
    code?: number;
    data?: StudentBasicInfoBO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageActivityVO_ = {
    code?: number;
    data?: PageActivityVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageProjectVO_ = {
    code?: number;
    data?: PageProjectVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePagePublicityVO_ = {
    code?: number;
    data?: PagePublicityVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponseProjectVO_ = {
    code?: number;
    data?: ProjectVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePublicityVO_ = {
    code?: number;
    data?: PublicityVO;
    message?: string;
    success?: boolean;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getActivityVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getProjectByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getPublicityByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSignUserListUsingGETParams = {
    /** id */
    id?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageActivityVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: ActivityVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProjectVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: ProjectVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePublicityVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: PublicityVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type ProjectAddRequest = {
    projectName?: string;
    projectType?: number;
    publicityId?: number;
    studentType?: number;
    teacherName?: string[];
    userName?: string;
    userStudentNumber?: string;
  };

  type ProjectQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    projectType?: number;
    publicityId?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    studentType?: number;
  };

  type ProjectUpdateRequest = {
    id?: number;
    projectName?: string;
    projectType?: number;
    publicityId?: number;
    studentType?: number;
    teacherName?: string[];
    userName?: string;
    userStudentNumber?: string;
  };

  type ProjectVO = {
    id?: number;
    projectName?: string;
    projectType?: number;
    publicityId?: number;
    studentType?: number;
    teacherName?: string[];
    userName?: string;
    userStudentNumber?: string;
  };

  type PublicityAddRequest = {
    endTime?: string;
    publicityInstitute?: string;
    publicityName?: string;
    publicityText?: string;
    startTime?: string;
  };

  type PublicityQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type PublicityUpdateRequest = {
    endTime?: string;
    id?: number;
    publicityInstitute?: string;
    publicityName?: string;
    publicityText?: string;
    startTime?: string;
  };

  type PublicityVO = {
    createTime?: string;
    endTime?: string;
    id?: number;
    publicityInstitute?: string;
    publicityName?: string;
    publicityText?: string;
    startTime?: string;
  };

  type RewardTypeVO = {
    rewardId?: number;
    rewardName?: string;
  };

  type StudentBasicInfoBO = {
    studentName?: string;
    studentNumber?: string;
    userId?: number;
  };
}
