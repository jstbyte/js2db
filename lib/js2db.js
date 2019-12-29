const NeDb = require('nedb');


class Js2db{

    path /* DataBase Diractory */
    cache; /* Map Type Cache Storage */
    lilo; /* Last In Last Out Array */
    max; /* Capacity Of Cache */

    constructor(path, max_cache_size ) {

        if ( max_cache_size > 1 ) {
            this.max = max_cache_size;
        } else this.max = 10;

        if ( typeof path === 'string' && path !== '' ) {
            this.path = path;
        } else this.path = '.';

        this.cache = new Map();
        this.lilo = [];

    }



    /* Open and Cache Database and validate max cache */
    open( dbname ) {

        return new Promise((resolve, reject) => {

            if( this.cache.has(dbname) ) {

                reject(new Error('DataBase Already Exsist In Cache'));

            } else {

                if ( this.cache.size >= this.max ) {
                    this.cache.delete(this.lilo[0]);
                    this.lilo.splice(0, 1);
                }

                const db = new NeDb(`${ this.path }/${ dbname }.db`);

                db.loadDatabase(err => {
                    if ( err ) {

                        reject(err);

                    } else {

                        this.cache.set(dbname, db);
                        this.lilo.push(dbname);
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

    /* Update DataBase */
    update( dbname, query, update, option = {} ) {

        return new Promise((resolve, reject) => {

            if ( this.cache.has(dbname) ) {

                const db = this.cache.get(dbname);

                db.update(query, update, option, (err, num) => {

                    if ( err ) {

                        reject(err);

                    } else resolve(num);
                });
            } else reject(new Error('DataBase Not Found In Cache'));
        });
    }


    /* Delete Record From DataBase */
    remove( dbname, query, multi = false ) {

        return new Promise((resolve, reject) => {

            if ( this.cache.has(dbname) ) {

                const db = this.cache.get(dbname);

                db.remove(query, { multi }, (err, num) => {

                    if ( err ) {

                        reject(err);

                    } else resolve(num);
                });
            } else reject(new Error('DataBase Not Found In Cache'));
        });
    }


    /* Query Count DataBase*/
    count( dbname, query ) {

        return new Promise((resolve, reject) => {

            if ( this.cache.has(dbname) ) {

                const db = this.cache.get(dbname);

                db.count(query, (err, num) => {

                    if ( err ) {

                        reject(err);

                    } else resolve(num);
                });
            } else reject(new Error('DataBase Not Found In Cache'));
        });
    }

    /* get DB For Full Control */
    getdb( dbname ) {

        return new Promise((resolve, reject)=>{
            
            if ( this.cache.has(dbname) ) {

                resolve(this.cache.get(dbname));

            } else reject(new Error('DataBase Not Found In Cache'));
        });
    }

}


module.exports = Js2db;