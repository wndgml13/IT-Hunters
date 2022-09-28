export interface IMonthMonster {
  folioTitle: string;
  nickname: string;
  profileImage: string;
  stacks: IStack[];
  followCnt: number;
}

interface IStack {
  stackName: string;
}
