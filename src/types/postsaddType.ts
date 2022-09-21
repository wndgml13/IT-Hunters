// 게시글 등록
export interface PostsAdd {
  title: string;
  content: string;
  duration: number;
  stacks: string[];
  backend: number;
  frontend: number;
  designer: number;
  fullstack: number;
}
