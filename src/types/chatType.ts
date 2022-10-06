export interface chatlist {
  id: number;
  channelName: string;
  lastMessage: string;
  imgUrl: string;
}

export interface chatData {
  channelId: number;
  content: string;
  createdAt: string;
  memberId: number;
  nickname: string;
  profileImg: string;
}

export interface chatRoominfo {
  channelId: number;
  channelName: string;
  leaderId: number;
  squadMembers: chatRoomSquads[];
}

export interface chatRoomSquads {
  memberId: number;
  nickname: string;
  profileImg: string;
}
