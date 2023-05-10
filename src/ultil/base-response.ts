
export type baseResponseProps = {
  message: string;
  data?: any;
};

export class BaseResponse {
  message: string;
  data?: any;

  constructor(infoRes: baseResponseProps) {
    this.message = infoRes.message;
    this.data = infoRes.data;
  }
}
