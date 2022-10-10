import { Link, useParams } from "react-router-dom";
import { PortfolioApi } from "../APIs/PortfolioAPI";
import { PageHeader } from "../components/PageHeader";

const UserPage = () => {
  const { id } = useParams();
  const { data: userFolio } = PortfolioApi.getPortfolio(Number(id));

  return (
    <div className="w-full overflow-y-scroll h-full pb-[4rem] overflow-x-hidden bg-[#F8F8FA]">
      <div className="px-5">
        <PageHeader pgTitle={`${userFolio?.nickname} 님의 페이지`} />
      </div>

      <div className="my-10">
        <div className="relative flex justify-center">
          <img
            className="w-[70px] h-[70px] rounded-full"
            src={userFolio?.profileUrl}
          />
        </div>
        <p className="text-2xl font-bold text-center">{userFolio?.nickname}</p>

        <p className="text-sm font-medium text-center">
          {userFolio?.className
            ? userFolio.className
            : "직군을 선택하지 않았습니다"}
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
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
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

export default UserPage;
