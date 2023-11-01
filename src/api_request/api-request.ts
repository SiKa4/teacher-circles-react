import axios from "axios";

class ApiRequest {
    mainUrl = "http://89.251.144.134:5001/api/";

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
                    first_name: string,
                    last_name: string,
                    surname: string,
                    id: number,
                    id_role: number,
                    password: string,
                    username: string
                }[]);
            })
            .catch(() => {
                return null;
            });
    }

    public postEmployee(employee: {
        username: string,
        password: string,
        surname: string,
        first_name: string,
        last_name: string
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
                return false;
            });
    }

    public getAllSocietys(id: number) {
        return axios.get(this.mainUrl + `GetSocietys/${id}`)
            .then(response => {
                const data = response.data.societies;
                return data as {
                    hoursNumber: number,
                    id: number,
                    name: string
                }[];
            })
            .catch(() => {
                return null;
            });
    }

    public getAllStudents() {
        return axios.get(this.mainUrl + `GetStudents`)
            .then(response => {
                const data = response.data.students;
                return data as {
                    id: number,
                    surname: string,
                    first_name: string,
                    last_name: string,
                    birth_date: string
                }[];
            })
            .catch(() => {
                return null;
            });
    }

    public addNewSociety(dataToSend: {
        name: string,
        hours_number: number
    }) {
        return axios.post(this.mainUrl + "CreateSociety", dataToSend)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public createLesson(lessonData: {
        room_number: number,
        start_date: string,
        week_day: number,
        employee_id: number,
        society_id: number
    }) {
        return axios.post(this.mainUrl + "CreateLesson", lessonData)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public GetLessons(idUser: number) {
        return axios.get(this.mainUrl + `GetLessons/${idUser}`)
            .then(response => {
                const data = response.data.groupedLessons;
                return data as {
                    weekDay: number,
                    lessons: {
                        id: number,
                        room_number: number,
                        start_date: string,
                        week_day: number,
                        societyName: string,
                        employee_id: number
                    }[]
                }[];
            })
            .catch(() => {
                return null;
            });
    }

    public DeleteLesson(idLessons: number) {
        return axios.delete(this.mainUrl + `DeleteLesson/${idLessons}`)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public GetStatistics() {
        return axios.get(this.mainUrl + `GetStatics`)
            .then(response => {
                return response.data.statics as {
                    totalVisits: number,
                    totalAbsent: number,
                    totalLessons: number,
                    totalSocieties: number,
                    totalTeachers: number,
                    attendancePercent: number,
                    absentPercent: number,
                    dailyData: {
                        date: string,
                        visits: number,
                        absences: number
                    }[]
                };
            })
            .catch(() => {
                return null;
            });
    }

    public deleteCircle(idCircle: number) {
        return axios.delete(this.mainUrl + `DeleteSociety/${idCircle}`)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public UpdateLesson(lessonData: {
        week_day: number,
    }, idLesson: number) {
        return axios.put(this.mainUrl + `UpdateLesson/${idLesson}`, lessonData)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public DeleteStudent(idStudent: number) {
        return axios.delete(this.mainUrl + `DeleteStudent/${idStudent}`)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public postStudent(student: {
        surname: string,
        first_name: string,
        last_name: string,
        birth_date: string
    }) {
        return axios.post(this.mainUrl + "CreateStudent", student)
            .then(() => {
                return true;
            })
            .catch(() => {
                return null;
            });
    }

    public GetStudentsSociety(idCircle: number) {
        return axios.get(this.mainUrl + `GetStudentsSociety/${idCircle}`)
            .then(response => {
                const data = response.data.students;
                return data as {
                    id: number,
                    surname: string,
                    first_name: string,
                    last_name: string,
                    birth_date: string
                    isInSociety: boolean
                }[];
            })
            .catch(() => {
                return null;
            });
    }

    public AddStydentInSociety(body: {
        student_id: number,
        society_id: number
    }) {
        return axios.post(this.mainUrl + `AddStudent`, body)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    public DeleteStydentInSociety(body: {
        student_id: number,
        society_id: number
    }) {
        return axios.post(this.mainUrl + `DeleteStudentSociety`, body)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    public GetStudentsInLesson(idLesson: number) {
        return axios.get(this.mainUrl + `GetStudents/${idLesson}`)
            .then(response => {
                const data = response.data.students;
                return data as {
                    student: {
                        id: number,
                        surname: string,
                        first_name: string,
                        last_name: string,
                        birth_date: string,
                    }
                    isInSociety: boolean
                }[];
            })
            .catch(() => {
                return null;
            });
    }

    public AddVisit(data: { lessonId: number, studentVisits: { studentId: number, visit: number }[] }) {
        return axios.post(this.mainUrl + `AddVisit`, data)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    public GetHistoryLessons(employeeId: number) {
        return axios.get(this.mainUrl + `GetHistoryLessons/${employeeId}`)
            .then(response => {
                const data = response.data;
                console.log(response);
                return data as {
                    history: {
                        lesson: {
                            id: number,
                            room_number: number,
                            start_date: string,
                            societyName: string,
                            latestVisitDate: string
                        },
                        studentVisits: {
                            surname: string,
                            first_name: string,
                            last_name: string,
                            visit: boolean
                        }[],
                    }[]
                }
            })
            .catch(() => {
                return null;
            });
    }
}

export const apiRequest = new ApiRequest();
