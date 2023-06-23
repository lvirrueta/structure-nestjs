export class JsonResponse<T> {
  private succeed: boolean;
  private data: T;
  private message: string;
  private created: Date;

  constructor(obj: IJsonResponse) {
    const { succeed, data, message } = obj;
    this.succeed = succeed !== undefined ? succeed : true;
    this.created = new Date();
    this.message = message;
    this.data = data as T;
  }
}

export interface IJsonResponse {
  succeed?: boolean;
  data: unknown;
  message?: string;
}
