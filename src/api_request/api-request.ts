import axios from "axios";

class ApiRequest {
    mainUrl = "http://192.168.0.51:5001/api/";

    public getUserByLoginPassword(login: string, password: string) {
        const dataToSend = {
            username: login,
            password: password,
        };

        return axios.post(this.mainUrl + "Login", dataToSend)
            .then(response => {
                const data = response.data;
                return {role: data.role, user_id: data.user_id}
            })
            .catch(() => {
                return null;
            });
    }

    public getUserInfoById(idUser: string) {
        return axios.get(this.mainUrl + `GetEmploye/${idUser}`)
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
    }

    public getAllEmployee() {
        return axios.get(this.mainUrl + `GetEmployes`)
            .then(response => {
                const data = response.data.employes;
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
    }

    public postEmployee(employee: {
        username: String,
        password: String,
        surname: String,
        first_name: String,
        last_name: String
    }) {
        return axios.post(this.mainUrl + "CreateEmployee", employee)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public deleteEmployeByid(idEmploye: number) {
        return axios.delete(this.mainUrl + `DeleteEmployee/${idEmploye}`)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public getAllSocietys(id: number) {
        return axios.get(this.mainUrl + `GetSocietys/${id}`)
            .then(response => {
                const data = response.data.societies;
                return data as {
                    hoursNumber: number,
                    id: number,
                    name: String
                }[];
            })
            .catch(() => {
                return null;
            });
    }

    public addNewSociety(dataToSend : {name: String, hours_number: number}) {
        return axios.post(this.mainUrl + "CreateSociety", dataToSend)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }
}

export const apiRequest = new ApiRequest();
