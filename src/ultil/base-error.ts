type BaseErrorProps = {
  message: string;
  statusCode?: any;
};

export type ErrorBase = Error & { statusCode?: number };

export const baseError = (errorInfo: BaseErrorProps) => {
  const error: Error & { statusCode?: number } = new Error(errorInfo.message);
  error.statusCode = errorInfo?.statusCode || 500;
  return error;
};
