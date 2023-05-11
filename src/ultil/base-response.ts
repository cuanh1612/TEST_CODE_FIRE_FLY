export type baseResponseProps = {
  message?: string;
  data?: any;
  success?: boolean;
  error?: any;
};

export class BaseResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;

  constructor({ success = true, message, data, error }: baseResponseProps) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  toError() {
    return {
      success: this.success,
      error: this.error,
    };
  }
}
