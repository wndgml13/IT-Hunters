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
    <div className="h-full w-full absolute top-0 right-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
      <div
        ref={node}
        className="absolute inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl pb-[4rem] px-6"
      >
        <div className="my-4 flex justify-between">
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
        <StackListDropdwon stacks={stacks} setStacks={setStacks} />
      </div>
      <button
        onClick={onSubmitStack}
        className="text-white z-50 bg-brandBlue focus:ring-4 focus:outline-none font-medium absolute bottom-0 w-full h-[3.5rem] text-XL px-5 py-2.5 text-center"
      >
        수정완료
      </button>
    </div>
  );
};
