export interface ActionResponse {
  status: "SUCCESS" | "ERROR";
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
}
