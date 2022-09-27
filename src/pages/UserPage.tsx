import { Link, useParams } from "react-router-dom";
import { PortfolioApi } from "../APIs/PortfolioAPI";
import { PageHeader } from "../components/PageHeader";

export const UserPage = () => {
  const { id } = useParams();
  const { data: userFolio } = PortfolioApi.getPortfolio(Number(id));

  return (
    <div className="w-full overflow-y-scroll h-full pb-[4rem] overflow-x-hidden bg-[#F8F8FA]">
      <PageHeader pgTitle={"페이지"} />

      <div className="my-10">
        <div className="relative flex justify-center">
          <img
            className="w-[70px] h-[70px] rounded-full"
            src={userFolio?.profileUrl}
          />
        </div>
        <p className="text-2xl font-bold text-center">안녕</p>

        <p className="text-sm font-medium text-center">
          {/* {userProfile?.className} */}
          프론트엔드
        </p>
      </div>

      <div className="pt-4 w-full rounded-t-[40px] px-6 pb-10 bg-white">
        <div className="mt-8">
          <h2 className="text-lg font-bold">한줄 소개 </h2>
          <p className="my-4 break-all">"{userFolio?.title}"</p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-6">보유 스택</h2>

          <ul className="grid gap-1 w-full grid-cols-3">
            {userFolio?.stackList.map((stack, idx) => (
              <li key={idx}>
                <p className="flex justify-center p-2 w-full text-[14px] border-2 rounded-lg border-black">
                  {stack.stackName}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <p className="text-lg font-bold">포트폴리오</p>
          <div className="flex justify-between mt-6">
            {userFolio?.notionUrl !== "" && userFolio?.notionUrl !== null ? (
              <a
                className="mx-auto relative w-14 h-14 bg-gray-300 rounded-full"
                href={userFolio?.notionUrl}
                target="_blank"
              >
                <img
                  className="w-full h-full border rounded-full"
                  src="https://static.twig.money/images/company/21/wTlJpLE2"
                />
              </a>
            ) : null}

            {userFolio?.githubUrl !== "" && userFolio?.githubUrl !== null ? (
              <a
                className="mx-auto relative w-14 h-14 bg-gray-300 rounded-full"
                href={userFolio?.githubUrl}
              >
                <img
                  className="w-full h-full border rounded-full"
                  src="data:image/png;base64,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"
                />
              </a>
            ) : null}

            {userFolio?.blogUrl !== "" && userFolio?.blogUrl !== null ? (
              <a
                className="mx-auto relative w-14 h-14 bg-gray-300 rounded-full"
                href={userFolio?.blogUrl}
              >
                <img
                  className="w-full h-full border rounded-full"
                  src="https://as2.ftcdn.net/v2/jpg/02/44/68/97/1000_F_244689725_wCaHdOOJohF5fDtXvhj4Hid1JvZYqwJc.jpg"
                />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-8 mb-6 py-2">
          <h2 className="text-lg font-bold">완료된 퀘스트</h2>
          {userFolio?.completedQuestList?.map(m => (
            <div className="py-2" key={m.questId}>
              <h3 className="text-xl text-brandBlue">
                <Link to={`/posts/${m.questId}`}>{m.questTitle}</Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
