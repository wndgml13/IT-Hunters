import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/Login/SignInPage";
import { SignUpPage } from "../pages/Login/SignUpPage";
import { MainPage } from "../pages/MainPage";
import { MyPage } from "../pages/MyPage";
import { PostsDetail } from "../components/PostsDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/posts" element={<PostsDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
