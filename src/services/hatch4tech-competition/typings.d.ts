declare namespace API {
  type AnnounceAddRequest = {
    announceContent?: string;
    announceFile?: string;
    announceFrom?: string;
    announceName?: string;
    competitionId?: number;
  };

  type AnnounceQueryRequest = {
    competitionId?: number;
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type AnnounceUpdateRequest = {
    announceContent?: string;
    announceFile?: string;
    announceFrom?: string;
    announceName?: string;
    competitionId?: number;
    id?: number;
  };

  type AnnounceVO = {
    announceContent?: string;
    announceFile?: string;
    announceFrom?: string;
    announceName?: string;
    id?: number;
    publishTime?: string;
    teamList?: TeamRankVO[];
  };

  type BaseResponseAnnounceVO_ = {
    code?: number;
    data?: AnnounceVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
    success?: boolean;
  };

  type BaseResponseCompetitionVO_ = {
    code?: number;
    data?: CompetitionVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponseListCompetitionInfoVO_ = {
    code?: number;
    data?: CompetitionInfoVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListResourceTypeVO_ = {
    code?: number;
    data?: ResourceTypeVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListResourceVO_ = {
    code?: number;
    data?: ResourceVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageAnnounceVO_ = {
    code?: number;
    data?: PageAnnounceVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageCompetitionVO_ = {
    code?: number;
    data?: PageCompetitionVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResourceVO_ = {
    code?: number;
    data?: PageResourceVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageStatusVO_ = {
    code?: number;
    data?: PageStatusVO_;
    message?: string;
    success?: boolean;
  };

  type CompetitionAddRequest = {
    competitionDescript?: string;
    competitionHost?: string;
    competitionImg?: string;
    competitionName?: string;
    endTime?: string;
    memberNum?: number;
    resourceList?: ResourceAddRequest[];
    startTime?: string;
    statusList?: StatusAddRequest[];
  };

  type CompetitionFavourRequest = {
    competitionId?: number;
  };

  type CompetitionInfoVO = {
    competitionName?: string;
    id?: number;
  };

  type CompetitionQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type CompetitionSignRequest = {
    competitionFileList?: FileAddRequest[];
    competitionId?: number;
    projectDescription?: string;
    projectName?: string;
    teamId?: number;
  };

  type CompetitionUpdateRequest = {
    competitionDescript?: string;
    competitionHost?: string;
    competitionImg?: string;
    competitionName?: string;
    endTime?: string;
    id?: number;
    startTime?: string;
  };

  type CompetitionVO = {
    competitionDescript?: string;
    competitionHost?: string;
    competitionImg?: string;
    competitionName?: string;
    endTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    id?: number;
    resourceList?: ResourceVO[];
    startTime?: string;
    statusList?: StatusVO[];
  };

  type DeleteRequest = {
    id?: number;
  };

  type FileAddRequest = {
    fileName?: string;
    fileUrl?: string;
    resourceId?: number;
    resourceType?: number;
  };

  type FileVO = {
    fileId?: number;
    fileName?: string;
    fileUrl?: string;
  };

  type getAnnounceByIdUsingGETParams = {
    /** competitionId */
    competitionId?: number;
  };

  type getCompetitionVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getResourceByTeamIdUsingGETParams = {
    /** competitionId */
    competitionId: number;
    /** teamId */
    teamId: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageAnnounceVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: AnnounceVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCompetitionVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: CompetitionVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageResourceVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: ResourceVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageStatusVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: StatusVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type ResourceAddRequest = {
    competitionId?: number;
    resourceName?: string;
    resourceNum?: number;
    resourceType?: number;
  };

  type ResourceQueryRequest = {
    competitionId?: number;
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type ResourceTypeVO = {
    typeId?: number;
    typeName?: string;
  };

  type ResourceUpdateRequest = {
    resourceId?: number;
    resourceName?: string;
    resourceNum?: number;
    resourceType?: number;
  };

  type ResourceVO = {
    fileList?: FileVO[];
    resourceId?: number;
    resourceName?: string;
    resourceNum?: number;
    resourceType?: string;
  };

  type StatusAddRequest = {
    competitionId?: number;
    statusName?: string;
    statusTime?: string;
  };

  type StatusQueryRequest = {
    competitionId?: number;
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type StatusUpdateRequest = {
    statusId?: number;
    statusName?: string;
    statusTime?: string;
  };

  type StatusVO = {
    hasComplete?: number;
    statusId?: number;
    statusName?: string;
    statusTime?: string;
  };

  type TeamMemberBO = {
    userId?: number;
    userName?: string;
  };

  type TeamRankVO = {
    memberList?: TeamMemberBO[];
    price?: number;
    teacherName?: string;
    teamId?: number;
    teamName?: string;
  };
}
