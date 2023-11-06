export interface IUserModel {
  roles?: any[];
  id?: string;
  eduToken?: string;
  login?: number;
  name?: string;
  school?: string;
  password?: string;
  class?: string;
  v?: number;
}

export interface ITermModel {
    items: ITermItem[];
    result_score: string;
}

export interface ITermItem {
  title?: string;
  middle_score?: string;
  final_score?: string;
  scores?: string[];
}
