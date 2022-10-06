import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { notificationApi } from "../APIs/NotificationApi";
import { AlramIcon } from "../assets/icons";
import { notiType } from "../types/notificationType";

export const NotificationPage = () => {
  const { data: notifications } = notificationApi.getQuestOffer();
  const queryClient = useQueryClient();

  const { mutateAsync: approveQuestoffer } =
    notificationApi.approveQuestOffer();

  const onApproveRequest = (offerId: number) => {
    approveQuestoffer(offerId).then(() => {
      queryClient.invalidateQueries(["questoffer"]);
    });
  };

  const { mutateAsync: cancelQuestoffer } = notificationApi.cancelQuestOffer();
  const { mutateAsync: deleteNotification } =
    notificationApi.deleteNotification();

  const onCancelRequest = (offerId: number) => {
    cancelQuestoffer(offerId).then(() => {
      queryClient.invalidateQueries(["questoffer"]);
    });
  };
  const onDeleteNotification = (offerId: number) => {
    deleteNotification(offerId).then(() => {
      queryClient.invalidateQueries(["questoffer"]);
    });
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-[4.5rem]">
      <div className="flex py-4 px-6 absolute top-0 left-0 right-0 z-50 bg-white border-b-2">
        <h1 className="mr-2 text-2xl font-cookie">알림</h1> <AlramIcon />
      </div>
      <ul className="flex-col gap-y-5 mt-20 px-6">
        {notifications?.map((noti: notiType) =>
          noti.offerType === "NEWOFFER" ? (
            <li
              className="flex flex-col mb-4 bg-white rounded-lg border shadow-md hover:bg-gray-100"
              key={noti.offerId}
            >
              <div className="flex px-2 ">
                <Link to={`/user/${noti.offeredMemberId}`}>
                  <div className="m-5 w-14 h-14">
                    <img
                      className="w-full h-full border rounded-full"
                      src={noti.profileImg}
                    />
                  </div>
                </Link>
                <div className="w-[65%] py-4">
                  <Link to={`/user/${noti.offeredMemberId}`}>
                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                      {noti.offeredMemberNickname}
                    </p>
                  </Link>
                  <Link to={`/posts/${noti.questId}`}>
                    <p className="truncate text-sm">
                      원문 :{" "}
                      <span className="font-semibold">{noti.questTitle}</span>
                    </p>
                  </Link>
                </div>
              </div>
              <div className="flex justify-between px-10 pb-4">
                <button
                  onClick={() => {
                    onApproveRequest(noti.offerId);
                  }}
                  className="text-brandBlue"
                >
                  승인
                </button>
                <button
                  onClick={() => {
                    onCancelRequest(noti.offerId);
                  }}
                  className="text-red-700"
                >
                  거절
                </button>
              </div>
            </li>
          ) : (
            <li
              className="mb-4 bg-white rounded-lg border shadow-md hover:bg-gray-100"
              key={noti.offerId}
            >
              <div className="flex px-2 ">
                <div className="w-full py-4 px-6">
                  {" "}
                  <Link to={`/posts/${noti.questId}`}>
                    <p className="truncate text-md">
                      원문 :{" "}
                      <span className="font-semibold">{noti.questTitle}</span>
                    </p>
                  </Link>
                  <p className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                    {noti.content}
                  </p>
                </div>
              </div>
              <div className="flex justify-end px-10 pb-4">
                <button
                  onClick={() => {
                    onDeleteNotification(noti.offerId);
                  }}
                >
                  확인
                </button>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
