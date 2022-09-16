import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { notificationApi } from "../APIs/NotificationApi";
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

  const onCancelRequest = (offerId: number) => {
    cancelQuestoffer(offerId).then(() => {
      queryClient.invalidateQueries(["questoffer"]);
    });
  };

  return (
    <div className="w-full m-auto overflow-y-scroll h-full pb-[3.5rem] p-6 overflow-x-hidde">
      <h1 className="text-xl pb-10">알림</h1>

      {notifications?.map((noti: notiType) => (
        <li
          className="flex flex-col mb-3 bg-white rounded-lg border shadow-md hover:bg-gray-100"
          key={noti.offerId}
        >
          <div className="flex p-4 leading-normal">
            <div className="m-5 relative w-14 h-14 bg-gray-300 rounded-full">
              <img
                className="w-full h-full border rounded-full"
                src={noti.profileImg}
              />
            </div>
            <div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {noti.offeredMemberId} : 오퍼한사람 ID
              </h5>
              <Link to={`/posts/${noti.questId}`}>
                원문 바로가기 Q# {noti.questId}
              </Link>
            </div>
          </div>
          <div className="flex justify-between px-10 pb-4">
            <button
              onClick={() => {
                onApproveRequest(noti.offerId);
              }}
            >
              승인
            </button>
            <button
              onClick={() => {
                onCancelRequest(noti.offerId);
              }}
            >
              거절
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};
// export const NotificationPage = () => {
//   const { data } = notificationApi.getQuestOffer();
//   console.log(data);
//   return (
//     <div className="w-full m-auto overflow-y-scroll h-full pb-[3.5rem] p-6 overflow-x-hidde">
//       <h1 className="text-xl pb-10">알림</h1>
//     </div>
//   );
// };
