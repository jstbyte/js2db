const NeDb = require('nedb');


class Js2db{

    path = '.';
    cache = new Map();

    constructor( path = '.' ) {
        this.path = path;
    }



    /* Open and Cache Database */
    open( dbname ) {

        return new Promise((resolve, reject) => {

            if( this.cache.has(dbname) ) {

                reject(new Error('DataBase Already Exsist In Cache'));

            } else {

                const db = new NeDb(`${ this.path }/${ dbname }.db`);
                db.loadDatabase(err => {
                    if ( err ) {

                        reject(err);

                    } else {

                        this.cache.set(dbname, db);
                        resolve();

                    }
                });
            }
        });
    }



    /* Clear From Cache DataBase */
    close( dbname ) {

        return new Promise((resolve, reject) => {

            if ( this.cache.has( dbname ) ) {

                this.cache.delete(dbname);
                resolve();

            } else reject(new Error('DataBase Not Found In Cache'));
        });
    };



    /* Insert into DataBase */
    insert( dbname, data ) {

        return new Promise((resolve, reject) => {

            if ( this.cache.has(dbname) ) {

                const db = this.cache.get(dbname);
                db.insert(data, (err, doc) => {

                    if ( err ) {

                        reject(err);

                    } else resolve(doc);
                });
            } else reject(new Error('DataBase Not Found In Cache'));
        });
    }



    /* Find in DataBase */
    find( dbname, query, projection = {} ) {

        return new Promise((resolve, reject) => {

            if ( this.cache.has(dbname) ) {

                const db = this.cache.get(dbname);
                
                db.find(query, projection, (err, docs) => {

                    if ( err ) {

                        reject(err);

                    } else resolve(docs);
                });
            } else reject(new Error('DataBase Not Found In Cache'));
        });
    }


}


module.exports = Js2db;