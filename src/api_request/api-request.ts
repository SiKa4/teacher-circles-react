import axios from "axios";

class ApiRequest {
    mainUrl = "http://192.168.0.51:5001/api/";

    public getUserByLoginPassword(login: string, password: string) {
        const dataToSend = {
            username: login,
            password: password,
        };

        const answer = axios.post(this.mainUrl + "Login", dataToSend)
            .then(response => {
                const data = response.data;
                return {role: data.role, user_id: data.user_id}
            })
            .catch(() => {
                return null;
            });
        return answer;
    }
}

export const apiRequest = new ApiRequest();
