export interface IQuestDetail {
  classes: {
    backend: number;
    frontend: number;
    fullstack: number;
    designer: number;
  };
  bookmarkCnt: number;
  commentCnt: number;
  content: string;
  createdAt: string;
  duration: number;
  modifiedAt: string;
  nickname: string;
  questId: number;
  status: boolean;
  title: string;
  stacks: string[];
  id: number;
}
export interface SubCommentGet {
  subCommentId: number;
  nickname: string;
  content: string;
  createdAt: number;
  modifiedAt: number;
  profileImage: string;
}

export interface CommentGet {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: number;
  modifiedAt: number;
  profileImage: string;
  subCommentList: SubCommentGet[];
}

export interface OffersPost {
  classType: {
    BACKEND: number | null;
    FRONTEND: number | null;
    DESIGNER: number | null;
    FULLSTACK: number | null;
  };
}
