interface stackName {
  stackName: string;
}

export interface completedQuestList {
  questId: number;
  questTitle: string;
}

export interface profilePortfolioType {
  blogUrl: string;
  completedQuestList: completedQuestList[];
  githubUrl: string;
  memberId: number;
  notionUrl: string;
  profileUrl: string;
  stackList: stackName[];
  title: string;
  nickname: string;
  className: string;
}

export interface portfolioType {
  title: string;
  blogUrl: string;
  githubUrl: string;
  notionUrl: string;
}
