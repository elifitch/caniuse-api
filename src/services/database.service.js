'use strict';

module.exports = (function() {
  const mongodb = require('mongodb');
  const Promise = require('bluebird');
  const mongoClient = mongodb.MongoClient;

  let state = {
    db: null
  }

  return {
    connect,
    getDb
  }

  //public api
  function connect(dbUrl) {
    return new Promise(function(resolve, reject) {
      //this does way too much
      mongoClient.connect(dbUrl, {
        promiseLibrary: Promise
      }).then(function(db){
        console.log('Connection established to', db.options.url);
        state.db = db;
        resolve(db);
      }).catch(function(err) {
        console.error('Unable to connect to the mongoDB server. Error:', err);
        reject(error);
      });
    })
  }

  function getDb() {
    return state.db;
  }
  
})()