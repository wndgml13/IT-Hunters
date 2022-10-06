import { BrowserRouter, Route, Routes } from "react-router-dom";
import SockJs from "sockjs-client";
import Stomp from "stompjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { lazy } from "react";

//Lazy Loading 으로 성능 개선하기!
const SignInPage = lazy(() => import("../pages/Login/SignInPage"));
const SignUpPage = lazy(() => import("../pages/Login/SignUpPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const MyPage = lazy(() => import("../pages/MyPage"));
const PostsDetail = lazy(() => import("../components/PostsDetail"));
const AddPosts = lazy(() => import("../components/AddPosts"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const FooterNavBar = lazy(() => import("../components/FooterNavBar"));
const ChatListPage = lazy(() => import("../pages/Chats/ChatListPage"));
const ChatRoomPage = lazy(() => import("../pages/Chats/ChatRoomPage"));
const Header = lazy(() => import("../components/Header"));
const NotificationPage = lazy(() => import("../pages/NotificationPage"));
const EditPosts = lazy(() => import("../components/EditPosts"));
const FindMyEmail = lazy(() => import("../pages/Login/FindMyEmail"));
const OAuthKakao = lazy(() => import("../pages/Login/OAuthKakao"));
const OAuthGoogle = lazy(() => import("../pages/Login/OAuthGoogle"));
const OAuthNaver = lazy(() => import("../pages/Login/OAuthNaver"));
const UserPage = lazy(() => import("../pages/UserPage"));
const NoLoginError = lazy(() => import("../pages/ErrorPage/NoLoginError"));
const EventPage = lazy(() => import("../pages/EventPage"));

import { alertState, onAlertState } from "../store/alertState";
import { AlertModal } from "../components/Modals/AlertModal";
import { useAlert } from "../hooks/useAlert";
import { getCookieToken } from "../config/cookies";

const baseURL = process.env.REACT_APP_API_BASEURL;
const usertoken = {
  Authorization: getCookieToken(),
};
const sock = new SockJs(`${baseURL}socket`);
const client = Stomp.over(sock);
client.heartbeat.outgoing = 20000;
client.heartbeat.incoming = 20000;
client.connect(usertoken, f => f);
client.debug = f => f;

const AppRouter = () => {
  const token = getCookieToken();
  const [tgVal, tg] = useRecoilState(onAlertState);
  const alertContent = useRecoilValue(alertState);

  useAlert({ client });

  return (
    <BrowserRouter>
      <div className="h-screen relative">
        {tgVal && (
          <AlertModal alertContent={alertContent} tg={tg} tgVal={tgVal} />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <MainPage />
              </>
            }
          />
          <Route path="/event" element={<EventPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/oauth/kakao/callback/*" element={<OAuthKakao />} />
          <Route path="/oauth/naver/callback/*" element={<OAuthNaver />} />
          <Route path="auth" element={<OAuthGoogle />} />
          <Route path="/findmyemail" element={<FindMyEmail />} />
          <Route
            path="/mypage"
            element={token ? <MyPage /> : <NoLoginError />}
          />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/posts/:id" element={<PostsDetail />} />
          <Route
            path="/addposts"
            element={token ? <AddPosts /> : <NoLoginError />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/chats"
            element={token ? <ChatListPage /> : <NoLoginError />}
          />
          <Route
            path="/chats/:id"
            element={
              token ? <ChatRoomPage client={client} /> : <NoLoginError />
            }
          />
          <Route
            path="notification"
            element={token ? <NotificationPage /> : <NoLoginError />}
          />
          <Route path="/editposts/:id" element={<EditPosts />} />
        </Routes>
      </div>

      <FooterNavBar />
    </BrowserRouter>
  );
};
export default AppRouter;
