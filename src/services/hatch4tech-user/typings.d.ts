declare namespace API {
  type AcademyVO = {
    academyId?: number;
    academyName?: string;
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

  type BaseResponseListAcademyVO_ = {
    code?: number;
    data?: AcademyVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListDegreeVO_ = {
    code?: number;
    data?: DegreeVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListPlanVO_ = {
    code?: number;
    data?: PlanVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListPoliticsVO_ = {
    code?: number;
    data?: PoliticsVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListPositionVO_ = {
    code?: number;
    data?: PositionVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListRaceVO_ = {
    code?: number;
    data?: RaceVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListStudentWishVO_ = {
    code?: number;
    data?: StudentWishVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseListTeacherInfoVO_ = {
    code?: number;
    data?: TeacherInfoVO[];
    message?: string;
    success?: boolean;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageCommentVO_ = {
    code?: number;
    data?: PageCommentVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageMedalVO_ = {
    code?: number;
    data?: PageMedalVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageStudentInfoVO_ = {
    code?: number;
    data?: PageStudentInfoVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageStudentWishVO_ = {
    code?: number;
    data?: PageStudentWishVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageTeacherVO_ = {
    code?: number;
    data?: PageTeacherVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponseStudentInfoVO_ = {
    code?: number;
    data?: StudentInfoVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseTeacherVO_ = {
    code?: number;
    data?: TeacherVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseUserBasicInfoBO_ = {
    code?: number;
    data?: UserBasicInfoBO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseUserInfoInTokenBO_ = {
    code?: number;
    data?: UserInfoInTokenBO;
    message?: string;
    success?: boolean;
  };

  type CommentAddRequest = {
    content?: string;
    teacherId?: number;
  };

  type CommentQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    studentId?: number;
    teacherId?: number;
  };

  type CommentThumbRequest = {
    commentId?: number;
  };

  type CommentVO = {
    content?: string;
    createTime?: string;
    hasThumb?: boolean;
    id?: number;
    studentAvatar?: string;
    studentId?: number;
    studentName?: string;
    teacherName?: string;
    thumbNum?: number;
  };

  type DegreeVO = {
    degreeId?: number;
    degreeName?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type ExpUpdateRequest = {
    expId?: number;
    expName?: string;
  };

  type getStudentInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getTeacherInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserBasicInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type HonorUpdateRequest = {
    honorId?: number;
    honorName?: string;
  };

  type MedalAddRequest = {
    medalImg?: string;
    medalName?: string;
  };

  type MedalAwardRequest = {
    medalId?: number;
    userId?: number;
  };

  type MedalQueryRequest = {
    current?: number;
    id?: number;
    medalName?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MedalUpdateRequest = {
    medalId?: number;
    medalImg?: string;
    medalName?: string;
  };

  type MedalVO = {
    id?: number;
    medalImg?: string;
    medalName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageCommentVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: CommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageMedalVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: MedalVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type PageStudentInfoVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: StudentInfoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageStudentWishVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: StudentWishVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTeacherVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: TeacherVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PlanVO = {
    id?: number;
    planName?: string;
  };

  type PoliticsVO = {
    id?: number;
    politicsName?: string;
  };

  type PositionVO = {
    positionId?: number;
    positionName?: string;
  };

  type RaceVO = {
    raceId?: number;
    raceName?: string;
  };

  type StudentExpVO = {
    expId?: number;
    expName?: string;
  };

  type StudentHonorVO = {
    honorId?: number;
    honorName?: string;
  };

  type StudentInfoVO = {
    email?: string;
    gender?: string;
    id?: number;
    phone?: string;
    race?: string;
    studentExp?: StudentExpVO[];
    studentGrade?: string;
    studentHonor?: StudentHonorVO[];
    studentMajor?: number;
    studentMedals?: StudentMedalsVO[];
    studentNumber?: string;
    studentPlan?: string;
    studentPolitics?: string;
    studentProfile?: string;
    studentSkill?: string;
    studentWish?: StudentWishVO[];
    userAccount?: string;
    userAge?: number;
    userAvatar?: string;
    userName?: string;
    userSlogan?: string;
    userWechat?: string;
  };

  type StudentMedalsVO = {
    medalImg?: string;
    medalName?: string;
  };

  type StudentNumberRequest = {
    studentNumber?: string;
    userName?: string;
  };

  type StudentQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    studentMajor?: number;
  };

  type StudentRegisterRequest = {
    captcha?: string;
    checkPassword?: string;
    email?: string;
    gender?: number;
    phone?: string;
    race?: string;
    studentExp?: string[];
    studentGrade?: string;
    studentHonor?: string[];
    studentMajor?: number;
    studentNumber?: string;
    studentPlan?: number;
    studentPolitics?: number;
    studentProfile?: string;
    studentSkill?: string;
    studentWish?: number[];
    userAccount?: string;
    userAge?: number;
    userPassword?: string;
    userSlogan?: string;
    userWechat?: string;
  };

  type StudentUpdateRequest = {
    captcha?: string;
    email?: string;
    phone?: string;
    studentPlan?: number;
    studentPolitics?: number;
    studentProfile?: string;
    studentSkill?: string;
    studentWish?: number[];
    userAvatar?: string;
    userId?: number;
    userSlogan?: string;
  };

  type StudentWishVO = {
    wishId?: number;
    wishName?: string;
  };

  type TeacherInfoVO = {
    id?: number;
    teacherName?: string;
  };

  type TeacherQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    teacherMajor?: number;
  };

  type TeacherUpdateRequest = {
    teacherAcademy?: number;
    teacherAchieve?: string;
    teacherBirth?: string;
    teacherDegree?: number;
    teacherMajor?: number;
    teacherPosition?: number;
    teacherProfile?: string;
    teacherResearchList?: string[];
    teacherTitle?: string;
    userAge?: number;
    userAvatar?: string;
    userId?: number;
    userName?: string;
    userSlogan?: string;
  };

  type TeacherVO = {
    gender?: string;
    id?: number;
    teacherAcademy?: string;
    teacherAchieve?: string;
    teacherBirth?: string;
    teacherDegree?: string;
    teacherMajor?: number;
    teacherPosition?: string;
    teacherProfile?: string;
    teacherResearch?: string[];
    teacherTitle?: string;
    userAge?: number;
    userAvatar?: string;
    userName?: string;
    userSlogan?: string;
  };

  type UserBasicInfoBO = {
    userAccount?: string;
    userAvatar?: string;
    userId?: number;
    userName?: string;
  };

  type UserInfoInTokenBO = {
    userAccount?: string;
    userAvatar?: string;
    userId?: number;
    userName?: string;
    userRole?: number;
  };

  type UserStatusRequest = {
    status?: number;
    userId?: number;
  };

  type WishAddRequest = {
    wishName?: string;
  };

  type WishUpdateRequest = {
    wishId?: number;
    wishName?: string;
  };
}
