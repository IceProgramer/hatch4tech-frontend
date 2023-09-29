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

  type BaseResponseListRewardTypeVO_ = {
    code?: number;
    data?: RewardTypeVO[];
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

  type DeleteRequest = {
    id?: number;
  };

  type getActivityVOByIdUsingGETParams = {
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

  type RewardTypeVO = {
    rewardId?: number;
    rewardName?: string;
  };
}
