import {Authorization} from "./pages/Authorization.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import {Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {appStore} from "./data/stores/app.store.ts";

export const App = observer(() => {
    const [cookies,] = useCookies(["user"]);

    useEffect(() => {
        if (!cookies.user) return;

        const userInfo : {role : string, user_id: string} = cookies.user;
        appStore.setUserInfo(userInfo);

    }, [cookies]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={appStore.getUserInfo != null ? <MainPage/> : <Authorization/>}/>
                <Route path="main" element={<MainPage/>}/>
            </Routes>
        </div>
    )
});

export default App
