var AudioDB = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                   window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBKeyRange = window.webkitIDBKeyRange;
}

AudioDB.db = null;

AudioDB.onerror = function(e) {
  console.log("error on AudioDB", e);
};

AudioDB.open = function(callback) {

    // We have opened a database called "audiodb" and assigned it to our variable db in the AudioDB.indexedDB object.
    var request = indexedDB.open("audiodb");

    request.onsuccess = function(e) {
        console.log("AudioDB initialized");
        AudioDB.db = e.target.result;
        callback();
    };

    //To update the schema of the database, i.e. creating or deleting object stores, you implement the onupgradeneeded handler
    request.onupgradeneeded = function(event){

    var objectStore = event.currentTarget.result.createObjectStore("sound", 
                                     { keyPath: "id"});
    }

    request.onerror = AudioDB.onerror;
};

AudioDB.addSound = function(id, src){
    var db = AudioDB.db;
    var transaction = db.transaction("sound", "readwrite");
    var objectStore = transaction.objectStore("sound"); 
    var request = objectStore.add({id: id, src: src});

    request.onsuccess = function(e){
        console.log("new record added");
    }
}


AudioDB.getSound = function(id, callback){
    var db = AudioDB.db;
    var transaction = db.transaction("sound"); 
    var objectStore = transaction.objectStore("sound");
    var request = objectStore.get(id);
    request.onsuccess = function(e){
        callback(request.result);
    }    
}

AudioDB.deleteSound = function(id){
    var db = AudioDB.db;
    var transaction = db.transaction("sound", "readwrite"); 
    var objectStore = transaction.objectStore("sound");

    var request = objectStore.delete(id); 
    
    request.onsuccess = function(e){
        console.log("result deleted", id);
    }    
}



// window.addEventListener("DOMContentLoaded", init, false);​


