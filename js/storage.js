const Storage = {
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    add(key, item) {
        const data = this.get(key);
        data.push(item);
        this.set(key, data);
    },

    clear(key) {
        localStorage.removeItem(key);
    },

    exportAll() {
        return {
            clients: this.get("clients"),
            projects: this.get("projects")
        };
    },

    importAll(data) {
        if (data.clients) this.set("clients", data.clients);
        if (data.projects) this.set("projects", data.projects);
    }
};
