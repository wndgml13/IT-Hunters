export const LoginLoading = () => {
  return (
    <div className="border flex justify-center items-center  w-full h-full text-center">
      <div>
        <div className="flex justify-center mb-10">
          <img src="/imgs/puu.png" className="w-[60%] h-[60%] animate-bounce" />
        </div>

        <p className="text-center text-xl font-cookie mb-6">로그인 중입니다.</p>
      </div>
    </div>
  );
};
