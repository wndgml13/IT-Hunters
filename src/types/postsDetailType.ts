// 게시글 상세 조회
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
// 게시글 수정
export interface EditIQuestDetail {
  title: string;
  content: string;
  frontend: number | null;
  backend: number | null;
  designer: number | null;
  fullstack: number | null;
  duration: number;
  stacks: string[];
}
// 답글 조회
export interface SubCommentGet {
  subCommentId: number;
  nickname: string;
  content: string;
  createdAt: number;
  modifiedAt: number;
  profileImage: string;
}
// 댓글 조회
export interface CommentGet {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: number;
  modifiedAt: number;
  profileImage: string;
  subCommentList: SubCommentGet[];
}
// 신청하기(합류요청)
export interface OffersPost {
  classType: string;
}
