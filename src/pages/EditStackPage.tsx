import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { StackListDropdwon } from "../components/StackListDropdown";
import { instance } from "../config/axios";
import { useModal } from "../hooks/useModal";
import { profilePortfolioType } from "../types/profileType";

export const EditStackPage = ({
  myfolio,
  tgVal,
  tg,
}: {
  myfolio: profilePortfolioType;
  tgVal: boolean;
  tg: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [stacks, setStacks] = useState<string[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    myfolio?.stackList.map(stack => {
      setStacks(prev => [...prev, stack.stackName]);
    });
  }, []);

  const submitStack = async () => {
    const { data } = await instance.post(`/api/members/addStack`, {
      stacks: stacks,
    });
    return data;
  };

  const { mutate: submitstack } = useMutation(submitStack, {
    onSuccess: () => {
      queryClient.invalidateQueries(["portfolio"]);
    },
  });

  const onSubmitStack = () => {
    submitstack();
    tg(false);
  };

  const node = useRef<null | HTMLDivElement>(null);

  useModal({ node, tgVal, tg });

  return (
    <div
      className={`${
        tgVal
          ? "h-full w-full absolute top-0 right-0 left-0 z-[9999] flex justify-center items-center bg-[#c2c2c2] bg-opacity-50"
          : "hidden"
      }`}
    >
      <div
        className={`absolute inset-x-0 bottom-0 pb-[4rem] bg-white z-50 rounded-t-2xl ${
          tgVal ? "translate-y-0" : "translate-y-full"
        } ease-in-out duration-300`}
        ref={node}
      >
        <div className="my-4 flex justify-between px-6">
          <h1 className="text-xl">스택 수정</h1>
          <button
            className="text-xl"
            onClick={() => {
              tg(false);
            }}
          >
            X
          </button>
        </div>
        <div className="px-6">
          <StackListDropdwon stacks={stacks} setStacks={setStacks} />{" "}
        </div>

        <button
          onClick={onSubmitStack}
          className="text-white z-[9999] bg-brandBlue focus:ring-4 focus:outline-none font-medium absolute bottom-0 w-full h-[3.5rem] text-XL px-5 py-2.5 text-center"
        >
          수정완료
        </button>
      </div>
    </div>
  );
};
