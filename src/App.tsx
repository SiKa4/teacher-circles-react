import {Authorization} from "./pages/Authorization.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import {observer} from "mobx-react-lite";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {appStore} from "./data/stores/app.store.ts";
import {apiRequest} from "./api_request/api-request.ts";

export const App = observer(() => {
    const [cookies,] = useCookies(["user"]);
    const userInfo = appStore.getUserInfo;

    useEffect(() => {
        (async () => {
            if (!cookies.user) {
                appStore.setUserInfo(null);
                return;
            }

            const userInfo: { role: string, user_id: string } = cookies.user;

            let user;
            user = await apiRequest.getUserInfoById(userInfo.user_id);
            appStore.setUserInfo(user);
        })();
    }, []);

    return (
        <div className="App">
            {userInfo ? <MainPage/> : <Authorization/>}
        </div>
    )
});

export default App
