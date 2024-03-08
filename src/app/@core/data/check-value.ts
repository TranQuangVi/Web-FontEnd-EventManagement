
export abstract class CheckData {
  abstract checkDateTime(date: string):boolean;
}

export class respones {
  status: boolean;
  error: string
}