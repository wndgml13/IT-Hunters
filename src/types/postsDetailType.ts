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
  profileImg: string;
}
export interface SubCommentGet {
  subCommentId: number;
  nickname: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  profileImage: string;
}

export interface CommentGet {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  profileImage: string;
  subCommentList: SubCommentGet[];
}

export interface OffersPost {
  classType: {
    BACKEND: string;
    FRONTEND: string;
    DESIGNER: string;
    FULLSTACK: string;
  };
}
