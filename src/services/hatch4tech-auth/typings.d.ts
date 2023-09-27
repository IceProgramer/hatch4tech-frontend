declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
    success?: boolean;
  };

  type BaseResponseTokenInfoVO_ = {
    code?: number;
    data?: TokenInfoVO;
    message?: string;
    success?: boolean;
  };

  type LoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type PasswordRequest = {
    checkPassword?: string;
    newPassword?: string;
    userAccount?: string;
  };

  type RefreshTokenRequest = {
    refreshToken?: string;
  };

  type TokenInfoVO = {
    accessToken?: string;
    expiresIn?: number;
    refreshToken?: string;
  };
}
