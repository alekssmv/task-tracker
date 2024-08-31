
class Api {

    public login = (login: string, password: string) => {
        return fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password
            }),
        })
            .then((response) => response.json())
    }

    public profile = (token: string) => {
        return fetch('/api/auth/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
    }

    public getAdminTasks = (token: string) => {
        return fetch('/api/tasks/admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
    }

    public getAssignees = (token: string) => {
        return fetch('/api/users/assignees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
    }
    public createTask = (token: string, task: any) => {
        return fetch('/api/tasks/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(task)
        })
            .then((response) => response.json())
    }
}

export default new Api()