declare namespace API {
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

  type BaseResponsePagePointRuleVO_ = {
    code?: number;
    data?: PagePointRuleVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageProductVO_ = {
    code?: number;
    data?: PageProductVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePointRuleVO_ = {
    code?: number;
    data?: PointRuleVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseProductVO_ = {
    code?: number;
    data?: ProductVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
    success?: boolean;
  };

  type DeleteRequest = {
    id?: number;
  };

  type File = {
    absolute?: boolean;
    absoluteFile?: File;
    absolutePath?: string;
    canonicalFile?: File;
    canonicalPath?: string;
    directory?: boolean;
    executable?: boolean;
    file?: boolean;
    freeSpace?: number;
    hidden?: boolean;
    lastModified?: number;
    name?: string;
    parent?: string;
    parentFile?: File;
    path?: string;
    readable?: boolean;
    totalSpace?: number;
    usableSpace?: number;
    writable?: boolean;
  };

  type getPointRuleByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getProductByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type InputStream = true;

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PagePointRuleVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: PointRuleVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProductVO_ = {
    current?: number;
    orders?: OrderItem[];
    pages?: number;
    records?: ProductVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PointExchangeApplyRequest = {
    fileUrl?: string[];
    memberPlace?: number;
    pointRule?: number[];
    pointType?: number;
    pointWeight?: number;
    projectName?: string;
  };

  type PointRuleQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    pageSize?: number;
    pointType?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type PointRuleUpdateRequest = {
    id?: number;
    pointName?: string;
    pointValue?: number;
    pointWeight?: number;
  };

  type PointRuleVO = {
    id?: number;
    pointName?: string;
    pointRuleList?: string[];
    pointType?: number;
    pointValue?: number;
    pointWeight?: number;
  };

  type ProductAddRequest = {
    productImg?: string;
    productName?: string;
    productNum?: number;
    productPoints?: number;
    productTypeList?: string[];
  };

  type ProductQueryRequest = {
    current?: number;
    id?: number;
    ids?: number[];
    maxPoints?: number;
    minPoints?: number;
    pageSize?: number;
    productTypeList?: string[];
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type ProductUpdateRequest = {
    exchangeNum?: number;
    id?: number;
    productImg?: string;
    productName?: string;
    productNum?: number;
    productPoints?: number;
    productTypeList?: string[];
  };

  type ProductVO = {
    exchangeNum?: number;
    id?: number;
    productImg?: string;
    productName?: string;
    productNum?: number;
    productPoints?: number;
    productTypeList?: string[];
  };

  type Resource = {
    description?: string;
    file?: File;
    filename?: string;
    inputStream?: InputStream;
    open?: boolean;
    readable?: boolean;
    uri?: URI;
    url?: URL;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type URI = {
    absolute?: boolean;
    authority?: string;
    fragment?: string;
    host?: string;
    opaque?: boolean;
    path?: string;
    port?: number;
    query?: string;
    rawAuthority?: string;
    rawFragment?: string;
    rawPath?: string;
    rawQuery?: string;
    rawSchemeSpecificPart?: string;
    rawUserInfo?: string;
    scheme?: string;
    schemeSpecificPart?: string;
    userInfo?: string;
  };

  type URL = {
    authority?: string;
    content?: Record<string, any>;
    defaultPort?: number;
    deserializedFields?: URLStreamHandler;
    file?: string;
    host?: string;
    path?: string;
    port?: number;
    protocol?: string;
    query?: string;
    ref?: string;
    serializedHashCode?: number;
    userInfo?: string;
  };

  type URLStreamHandler = true;
}
