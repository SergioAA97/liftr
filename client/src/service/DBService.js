

export default {
  checkDb: () => {
    if (!("indexedDB" in window)) {
      console.log("The browser does not support IndexedDB");
      return false;
    } else {
      return true;
    }
  },
  db: ({dbName, osName},callBack) => {
    if (!("indexedDB" in window)) {
      console.log("The browser does not support IndexedDB");
      return false;
    } else {
      let localDB = indexedDB.open(dbName);

      localDB.onerror = function () {
        console.error("Error", localDB.error);
      };

      localDB.onupgradeneeded  = function () {
        let db = localDB.result;
        let os;
        console.log(db);
        if (!db.objectStoreNames.contains(osName)) {
          console.log("Making object store");
          os = db.createObjectStore(osName,{keyPath: ['created','item.ref']})
        } else {
          console.log("Existing object store");
        }

      };

      localDB.onsuccess = function(){
        console.log("On success!");
        //Work with db
        callBack(localDB.result)
      }

    }
  }
};
