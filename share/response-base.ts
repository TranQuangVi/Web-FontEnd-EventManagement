export enum ResponseStatus {
    Success = 'Success',
    Failure = 'Failure',
  }
  export class ResponseBase {
    public readonly timestamp: Date;
    public readonly status: string;
    public readonly message: string;
    public readonly data: any;
  
    public static isSuccess = (response: ResponseBase) => {
      return response.status === ResponseStatus.Success;
    }
  }