type ErrorDetail = {
  title: string;
  description?: string;
};

export type ErrorCodes = {
  "not-authenticated": ErrorDetail;
  unauthorized: string | ErrorDetail;
  "no-user": ErrorDetail;
  "subscription-cancelled": ErrorDetail;
};
