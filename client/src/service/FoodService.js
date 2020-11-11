export default {
  checkDb: () => {
    if (!("indexedDB" in window)) {
      console.log("The browser does not support IndexedDB");
      return false;
    } else {
      return true;
    }
  },
  openDB: () => {
    if (!("indexedDB" in window)) {
      console.log("The browser does not support IndexedDB");
      return false;
    } else {
      let localDB = indexedDB.open("foodDb", 1);

      localDB.onerror = function () {
        console.error("Error", localDB.error);
      };

      localDB.onsuccess = function () {
        let db = localDB.result;
        console.log(db);
        if (!db.objectStoreNames.contains("food")) {
          console.log("Making object store");
        } else {
          console.log("Existing object store");
        }
        //Work with db
      };

      localDB.onupgradeneeded = function () {
        console.warn("Warning, no db present");
      };
    }
  },
};
