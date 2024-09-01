

class Api {

    public login = (login: string, password: string, role: string) => {
        return fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password,
                role: role
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

    public getAssigneeTasks = (token: string) => {
        return fetch('/api/tasks/assignee', {
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
    public updateTask = (token: string, task: any, id: number) => {
        return fetch(`/api/tasks/admin/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(task)
        })
            .then((response) => response.json())
    }
    public updateProgress = (token: string, data: any, id: number) => {
        return fetch(`/api/tasks/assignee/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
    }
    public deleteTask = (token: string, id: number) => {
        return fetch(`/api/tasks/admin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => response.json())
    }
}

export default new Api()