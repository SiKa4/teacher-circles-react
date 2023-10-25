import {Registration} from "./pages/Registration.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import {parsePath, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useCookies} from "react-cookie";

export const App = observer(() => {
    const [cookies,] = useCookies(["user"]);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={parseInt(cookies.user) == 2 ? <MainPage/> : <Registration/>}/>
                <Route path="main" element={<MainPage/>}/>
            </Routes>
        </div>
    )
});

export default App
