export interface IWeekModel {
  firstHalf?: Array<Half[]>;
  secondHalf?: Array<Half[]>;
}

export interface Half {
  name?: string;
  homeTask?: string;
  mark?: string;
}
