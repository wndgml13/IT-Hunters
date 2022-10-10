import { Suspense, useCallback, useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter";
import _ from "lodash";

// export const setOneVh = () => {
//   const vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// };
function App() {
  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const screenSize = useCallback(
    _.debounce(() => {
      setVh(window.innerHeight * 0.01);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }, 100),
    [vh],
  );

  useEffect(() => {
    screenSize();
    window.addEventListener("resize", screenSize);

    return () => window.removeEventListener("resize", screenSize);
  }, [screenSize]);

  return (
    <main
      style={{
        background: "linear-gradient(to bottom right, #c08bfc, #7e63be)",
      }}
    >
      <section className="block lg:hidden">
        <div className="fixed left-[30%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
          <div>
            <img
              src="/imgs/goBack.png"
              className="animate-bounce w-[270px] ml-4"
            />
          </div>
          <div className="w-[300px] mt-10">
            <img src="/imgs/LOGO_design.png" />
          </div>
        </div>
      </section>
      <section className="relative max-w-[480px] min-w-[320px] m-auto min_lg:ml-[57%] overflow-scroll bg-white shadow-2xl">
        <Suspense fallback={<div className="w-full h-screen">loading</div>}>
          <AppRouter />
        </Suspense>
      </section>
    </main>
  );
}

export default App;
