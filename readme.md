## See DataBase Docs At <strong> nedb <strong> .
#### I Just Make It Promise Based With Cache System .
#### I Build This System To Use In Express .
#### To Diretcly Use DataBase From Angular Or React Or Plain Fatch Api.


---------------------------------------------------------------------------

Example :
```javascript
const Js2db = require('js2db');

let max_cache_size = 5;/* That Means How Many DataBase Can Keep in Memory. By Default 10 */ 
let db_path = '.' /* Where DataBase or Json File Store */

const db = new Js2db( db_path,  max_cache_size);

/* Open A DataBase Name : MyDB */
let db_name = 'MyDB';
db.open( db_name ).then( loaded_form => { /* Loaded From 'DISK' or 'CACHE' */
    let json_objects = { id: 1, name: 'Jahid', github_link: '/A29sTech' };
    
    /* insert a record */
    return db.insert( db_name, json_objects );
}).then( insert_document => {
    console.log( insert_document );
    
    /* Query From DataBase */
    let query = { github_link: '/A29sTech' };
    return db.find( db_name, query );
}).then( query_results => {
    console.log( query_results );
    
    /* Delete Records From DataBase */
    let query = { github_link: '/A29sTech' };
    return db.remove( db_name, query );
}).then( num_removed => {
    consoel.log( num_removed );
}).catch( console.log );

```
