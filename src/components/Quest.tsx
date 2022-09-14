import { useNavigate } from "react-router-dom";
import { IQuest } from "../types/questType";

export const Quest = ({ quest }: { quest: IQuest }) => {
  const navigate = useNavigate();
  const { questId, content, title, duration, stacks } = quest;

  return (
    <li
      onClick={() => navigate(`/posts/${questId}`)}
      className="flex flex-col items-center mb-3 bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100"
    >
      <div className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg">
        <img />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{content}</p>
        <p>예상 소요기간 : {duration} 주</p>
        <div className="flex row">
          {stacks?.map(m => (
            <p className="bg-green-300 mx-1">{m}</p>
          ))}
        </div>
      </div>
    </li>
  );
};
