export interface classtype {
  frontend: number;
  backend: number;
  designer: number;
  fullstack: number;
}

export interface Quest {
  bookmarkCnt: number;
  classes: classtype;
  commentCnt: number;
  content: string;
  createdAt: string;
  duration: number;
  modifiedAt: string;
  nickname: string;
  stacks: string[];
  questId: number;
  status: boolean;
  title: string;
}

export interface IQuestlist extends Quest {
  data: Quest[];
}
