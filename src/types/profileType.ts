interface stackName {
  stackName: string;
}

export interface profilePortfolioType {
  blogUrl?: string;
  completedQuestList: [];
  githubUrl?: string;
  memberId: number;
  notionUrl?: string;
  profileUrl: string;
  stackList: stackName[];
  title: string;
}

export interface portfolioType {
  title?: string;
  blogUrl?: string;
  githubUrl?: string;
  notionUrl?: string;
}
