import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInPage } from "../pages/Login/SignInPage";
import { SignUpPage } from "../pages/Login/SignUpPage";
import { MainPage } from "../pages/MainPage";
import { MyPage } from "../pages/MyPage";
import { PostsDetail } from "../components/PostsDetail";
import { AddPosts } from "../components/AddPosts";
import { SearchPage } from "../pages/SearchPage";
import { FooterNavBar } from "../components/FooterNavBar";
import { ChatListPage } from "../pages/Chats/ChatListPage";
import { ChatRoomPage } from "../pages/Chats/ChatRoomPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/posts/:id" element={<PostsDetail />} />

        <Route path="/addposts" element={<AddPosts />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chats/:id" element={<ChatRoomPage />} />
      </Routes>
      <FooterNavBar />
    </BrowserRouter>
  );
};
export default AppRouter;
