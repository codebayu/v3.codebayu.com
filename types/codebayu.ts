export interface IResponseCodeBayuService<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ICareer {
  id?: string;
  position: string;
  company: string;
  logo: string;
  location: string;
  locationType: string;
  type: string;
  startDate: string;
  endDate: string | null;
  link: string;
  slug: string;
}
