import { PageHeader } from "../components/PageHeader";

const EventPage = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll pb-20">
      <div className="px-6">
        <PageHeader pgTitle="이벤트" />
      </div>
      <div className="w-full">
        <a href="https://forms.gle/YtXASLtocaJmGFRj7" target={"_blank"}>
          <img src="/imgs/런칭 이벤트.png" className="w-[100%] h-[100%]" />
        </a>
      </div>
    </div>
  );
};

export default EventPage;
