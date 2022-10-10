import { useNavigate } from "react-router-dom";
import { GoBackIcon } from "../assets/icons";

export const PageHeader = ({ pgTitle }: { pgTitle: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex my-5">
        <button onClick={() => navigate(-1)}>
          <GoBackIcon />
        </button>
        <p className="ml-4 text-[20px]">{pgTitle}</p>
      </div>
    </>
  );
};
