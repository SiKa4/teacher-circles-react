import {Authorization} from "./pages/Authorization.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import {observer} from "mobx-react-lite";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {appStore} from "./data/stores/app.store.ts";
import {apiRequest} from "./api_request/api-request.ts";
import styled, {keyframes} from "styled-components";

export const App = observer(() => {
    const [cookies,] = useCookies(["user"]);
    const userInfo = appStore.getUserInfo;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (!cookies.user) {
                appStore.setUserInfo(null);
                setIsLoading(false);
                return;
            }

            const userInfo: { role: string, user_id: string } = cookies.user;

            let user;
            user = await apiRequest.getUserInfoById(userInfo.user_id);
            appStore.setUserInfo(user);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {

    }, []);

    return (
        <div className="App">
            {isLoading ? (
                <div className="loading-indicator">Loading...</div>
            ) : userInfo ? (
                <MainPage/>
            ) : (
                <Authorization/>
            )}
            <LoadingWrapper>
                <TextSpan>Loading...</TextSpan>
            </LoadingWrapper>
        </div>
    )
});

export default App

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const TextSpan = styled.span`
`;
