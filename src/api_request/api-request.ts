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

    public getUserInfoById(idUser: string) {
        const answer = axios.get(this.mainUrl + `GetEmploye/${idUser}`)
            .then(response => {
                const data = response.data.employee;
                return {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    surname: data.surname,
                    id: data.id, id_role: data.id_role
                }
            })
            .catch(() => {
                return null;
            });
        return answer;
    }

    public getAllEmployee() {
        const answer = axios.get(this.mainUrl + `GetEmployes`)
            .then(response => {
                const data = response.data.employes;
                console.log(data)
                return (data as {
                    first_name: String,
                    last_name: String,
                    surname: String,
                    id: number, id_role: number,
                    password: string, username: string
                }[]);
            })
            .catch(() => {
                return null;
            });
        return answer;
    }
}

export const apiRequest = new ApiRequest();
