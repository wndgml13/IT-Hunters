import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";

interface editedInfoType {
  editedNickname: string | undefined;
  myClasses: string | undefined;
  profileImg: string;
}

export const UserInfoApi = {
  getUserInfo: () => {
    return useQuery(
      ["userinfo"],
      async () => {
        const { data } = await instance.get(`/api/members/status`);
        return data;
      },
      {
        enabled: !!getCookieToken(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    );
  },
  editUserInfo: () => {
    return useMutation(async (editInfo: editedInfoType) => {
      const { data } = await instance.put(`/api/members/update`, {
        nickname: editInfo.editedNickname,
        className: editInfo.myClasses,
        profileImage: editInfo.profileImg,
      });
      return data;
    });
  },
};
