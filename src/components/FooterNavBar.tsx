import { Link } from "react-router-dom";

export const FooterNavBar = () => {
  return (
    <section className="block fixed inset-x-0 bottom-0 z-10 bg-gray-300 h-16 shadow">
      <div className="flex justify-between content-center">
        <Link
          to="/search"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <span className="tab tab-home block text-2xl">검색</span>
        </Link>
        <Link
          to="/"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <span className="tab tab-kategori block text-2xl">홈</span>
        </Link>
        <Link
          to="/chats"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <span className="tab tab-explore block text-2xl">메세지</span>
        </Link>
        <Link
          to="/addposts"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <span className="tab tab-whishlist block text-2xl">게시글</span>
        </Link>
      </div>
    </section>
  );
};
