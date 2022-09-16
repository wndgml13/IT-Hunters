import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { instance } from "../config/axios";
import { getCookieToken } from "../config/cookies";
import { loginInfoState } from "../store/loginInfoState";

export const EditStackPage = () => {
  const [stacks, setStacks] = useState<string[]>([]);
  const userProfile = useRecoilValue(loginInfoState);
  const userToken = getCookieToken();
  const queryClient = useQueryClient();
  const addStack = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const copy = [...stacks];
    copy.push(e.target.value);
    setStacks(copy);
  };

  const onCancelStack = (i: number) => {
    const copy = [...stacks];
    copy.splice(i, 1);
    setStacks(copy);
  };

  const submitStack = async () => {
    const { data } = await instance.post(
      `/api/members/addStack`,
      { stacks: stacks },
      {
        headers: { authorization: userToken },
      },
    );
    return data;
  };

  const { mutate: submitstack } = useMutation(submitStack, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userinfo"]);
    },
  });

  const onSubmitStack = () => {
    submitstack();
  };

  return (
    <div className="w-auto h-[100vh] p-6">
      <p className="mb-10">스택 수정</p>
      <div className="mb-10">
        <p>현보유스택</p>
        {/* {userProfile.stacks?.map(stack => (
          <div>{stack}</div>
        ))} */}
      </div>

      <div className="flex justify-between mb-8">
        <p>스택추가</p>
        <select
          onChange={addStack}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
        >
          <option selected>스택 선택</option>
          <option value="React">React</option>
          <option value="Vue Js">Vue js</option>
          <option value="Javascript">JavaScript</option>
          <option value="Typescript">Typecript</option>
          <option value="Next Js">Next js</option>
          <option value="Svelte">Svelte</option>
          <option value="CSS3">CSS3</option>
          <option value="Angular Js">Angular js</option>
          <option value="jQuery">jQuery</option>
          <option value="Java">Java</option>
          <option value="Spring Boot">Spring Boot</option>
          <option value="Node Js">Node js</option>
          <option value="Python">Python</option>
          <option value="Django">Django</option>
          <option value="PHP">PHP</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="AWS">AWS</option>
          <option value="MySqal">MySQL</option>
          <option value="Oracle">Oracle</option>
        </select>
      </div>
      {stacks?.map((s, i) => (
        <div
          className="m-2 border border-black p-2 flex justify-between"
          key={i}
        >
          <p>#{s}</p> <button onClick={() => onCancelStack(i)}>X</button>
        </div>
      ))}
      {stacks.length > 0 ? (
        <button
          onClick={onSubmitStack}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium bottom-0 w-full h-[3rem] text-sm px-5 py-2.5 text-center"
        >
          추가
        </button>
      ) : null}
    </div>
  );
};
