import { BaseResponse } from "./BaseResponse";


export class LineOrBarChartObject {
  constructor(
    public labels: string[],
    public datasets: number[]
  ) {}
}

export class LineOrBarChartResponse extends BaseResponse {
  constructor(
    public success: boolean,
    public message: string,
    public data: {
      analysis: LineOrBarChartObject,
    },
  ) {
    super(success, message);
  }
}
