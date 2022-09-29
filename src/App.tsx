import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <main
      style={{
        background: "linear-gradient(to bottom right, #c08bfc, #7e63be)",
      }}
    >
      <section className="block lg:hidden">
        <div className="absolute left-[30%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
          <div className="">
            <img
              src="/imgs/goBack.png"
              className="animate-bounce w-[270px] ml-4"
            />
          </div>
          <div className="w-[300px] mt-10">
            <img src="/imgs/LOGO_design.png" className="" />
          </div>
        </div>
      </section>
      <section className="relative max-w-[480px] min-w-[320px] h-screen m-auto min_lg:ml-[57%] border overflow-hidden bg-white shadow-2xl">
        <AppRouter />
      </section>
    </main>
  );
}

export default App;
