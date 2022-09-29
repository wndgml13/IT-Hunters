export interface IMonthMonster {
  id: number;
  folioTitle: string;
  nickname: string;
  profileImage: string;
  stacks: IStack[];
  followCnt: number;
}

interface IStack {
  stackName: string;
}
