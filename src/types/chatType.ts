export interface chatlist {
  id: number;
  channelName: string;
}

export interface chatData {
  channelId: number;
  content: string;
  createdAt: string;
  memberId: number;
  nickname: string;
  profileImg: string;
}
