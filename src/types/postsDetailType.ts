export interface IQuestDetail {
  classes: {
    backend: number | null;
    frontend: number | null;
    fullstack: number | null;
    designer: number | null;
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
}

export interface IQuestDetailPut {
  title: string;
  content: string;
  frontend: number | null;
  backend: number | null;
  fullstack: number | null;
  designer: number | null;
  duration: number;
  stacks: string[];
}

export interface CommentPost {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: number;
  modifiedAt: number;
  profileImage: string;
}

export interface CommentGet {
  commentList: [
    {
      commentId: number;
      nickname: string;
      content: string;
      createdAt: number;
      modifiedAt: number;
      profileImage: string;
      subCommentList: [
        {
          subCommentId: number;
          nickname: string;
          content: string;
          createdAt: number;
          modifiedAt: number;
          profileImage: string;
        },
      ];
    },
  ];
}
