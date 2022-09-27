export interface LoginInfoType {
  id: number;
  folioTitle: string;
  followCnt: number;
  nickname: string;
  profileImage: string;
  stacks: stacks[];
  className: string;
}

interface stacks {
  stackName: string;
}
