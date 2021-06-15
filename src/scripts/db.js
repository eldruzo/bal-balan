const idb = require("idb");

export const dbPromised = idb.open("football-db", 1, (upgradeDb) => {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", {unique: false});
});


export const addData = (data) => {
    dbPromised
        .then((db) => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.put(data);
            return tx.complete;
        })
        .then(() => {
            M.toast({html: 'Data Berhasil Disimpan'});
        })
        .catch((error) => {
            console.log(`Error : ${error}`);
        });
}

export const getDataAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then((teams) => {
                resolve(teams);
            });
    });
}

export const getDataById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.get(id);
            })
            .then((team) => {
                resolve(team);
            });
    });
}

export const removeData = (id) => {
    dbPromised
        .then((db) => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.delete(parseInt(id));
            return tx.complete;
        })
        .then(() => {
            M.toast({html: 'Data Berhasil Dihapus'});
            setTimeout(() => {
                window.history.back();
            },2000);
        })
        .catch((error) => {
            console.log(`Error : ${error}`);
        });
}
