export interface GetCredentialsResponse {
  content: Credentials
  errorCode: string
  errorMsg: string
  status: string
}

export interface Credentials {
  sessionToken: string
  tmpSecretId: string
  tmpSecretKey: string
  token: string
  uploadUrl: string
}
