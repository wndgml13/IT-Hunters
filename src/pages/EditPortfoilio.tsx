import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { PortfolioApi } from "../APIs/PortfolioAPI";
import { useModal } from "../hooks/useModal";
import { profilePortfolioType } from "../types/profileType";

export const EditPortFolio = ({
  myfolio,
  tgVal,
  tg,
}: {
  myfolio: profilePortfolioType;
  tgVal: boolean;
  tg: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const [portfolio, setPortfolio] = useState({
    title: "",
    notionUrl: "",
    githubUrl: "",
    blogUrl: "",
  });
  const onInputPortfolioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPortfolio({ ...portfolio, [name]: value });
  };

  useEffect(() => {
    if (myfolio) {
      setPortfolio({
        title: myfolio.title ? myfolio.title : "",
        notionUrl: myfolio.notionUrl ? myfolio.notionUrl : "",
        githubUrl: myfolio.githubUrl ? myfolio.githubUrl : "",
        blogUrl: myfolio.blogUrl ? myfolio.blogUrl : "",
      });
    }
  }, [myfolio]);

  const { title, notionUrl, githubUrl, blogUrl } = portfolio;

  const portfolioInfo = {
    title,
    notionUrl,
    githubUrl,
    blogUrl,
  };

  const { mutateAsync: submitEditPortfolio } = PortfolioApi.editPortfolio();

  const onEditPortfolio = () => {
    submitEditPortfolio(portfolioInfo).then(() => {
      queryClient.invalidateQueries(["portfolio"]);
    });
    tg(false);
  };
  const node = useRef<null | HTMLDivElement>(null);

  useModal({ node, tgVal, tg });

  return (
    <div className="h-full w-full absolute top-0 right-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
      <div
        className="absolute inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl"
        ref={node}
      >
        <div className="mt-6 px-6 flex justify-between">
          <h1 className="text-xl">포트폴리오 수정</h1>
          <button
            className="text-xl"
            onClick={() => {
              tg(false);
            }}
          >
            X
          </button>
        </div>
        <div className="px-4 my-8">
          <div className="mb-8">
            <p className="text-xl">한줄 자기소개</p>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onInputPortfolioHandler}
              className="bg-gray-50 pl-2.5 border w-full h-10 border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              required
            />
          </div>
          <div className="mb-10 flex ">
            <div className="w-14 h-14 mr-3 ">
              <img
                className="w-full h-full border rounded-full"
                src="https://static.twig.money/images/company/21/wTlJpLE2"
              />
            </div>

            <input
              type="text"
              name="notionUrl"
              value={notionUrl}
              onChange={onInputPortfolioHandler}
              className="bg-gray-50 border pl-2.5 w-4/5 h-10 border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              placeholder="notion URL"
              required
            />
          </div>
          <div className="mb-10 flex ">
            <div className="w-14 h-14 mr-3 ">
              <img
                className="w-full h-full border rounded-full"
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              />
            </div>

            <input
              type="text"
              name="githubUrl"
              value={githubUrl}
              onChange={onInputPortfolioHandler}
              className="bg-gray-50 border pl-2.5 w-4/5 h-10 border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              placeholder="github URL"
              required
            />
          </div>
          <div className="mb-10 flex ">
            <div className="w-14 h-14 mr-3 ">
              <img
                className="w-full h-full border rounded-full"
                src="https://as2.ftcdn.net/v2/jpg/02/44/68/97/1000_F_244689725_wCaHdOOJohF5fDtXvhj4Hid1JvZYqwJc.jpg"
              />
            </div>

            <input
              type="text"
              name="blogUrl"
              value={blogUrl}
              onChange={onInputPortfolioHandler}
              className="bg-gray-50 border pl-2.5 w-4/5 h-10 border-gray-300 text-gray-900 mt-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Blog URL"
              required
            />
          </div>
        </div>
        <button
          onClick={onEditPortfolio}
          className="text-white bg-brandBlue focus:ring-4 focus:outline-none font-medium bottom-0 w-full h-[3.5rem] text-XL px-5 py-2.5 text-center"
        >
          수정완료
        </button>
      </div>
    </div>
  );
};
