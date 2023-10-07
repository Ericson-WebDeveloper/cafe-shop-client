export interface IJoiType {
  message: string;
  path: string[];
  type: string;
  context: {
    label: string;
    key: string;
  };
}

export interface ErrorResponseF {status: number, errors?: string[], message: string, error?: string}


export interface AxiosApiError400 {
  response_error: {
    message: string
  },
  status: number
}


export interface AxiosApiError422 {
  response_error: {
    errors: {
      details: IJoiType[]
    }
  },
  status: number
}

export interface IResponseDataWithPages<T> {
  totalDatas: number, 
  totalPage: number, 
  previous: null| { pageNumber: number|null, limit: number}, 
  next: {pageNumber: number, limit: number} | null, 
  currePage: number, 
  rowsPerPage: number, 
  data: T[]
}