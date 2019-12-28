//module.exports = require('./lib/js2db');
const Js2db = require('./lib/js2db')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  



const db = new Js2db();

db.open('mydb').then(()=>{

    console.log('Loded');

    readline.question(`What's your name?  :`, (name) => {

        db.insert('mydb', {
            name, age: 20, addrs: "Ambari"
        }).then((val) => {

            console.log('\n--inserted--\n');
            console.log(val);

        }).catch(console.log);



        db.find('mydb', {}).then(val => {

            console.log('\n--Query Result--\n');
            console.log(val);

        });


        db.update('mydb', {name}, {name:`Mr. ${ name }`}).then(val=>{

            console.log('\n--Updated--\n');
            console.log(val);

        });



        db.update('mydb', {name:`Mr. ${ name }`}, {name:`Md. ${ name } `}).then(val=>{

            console.log('\n--Updated--\n');
            console.log(val);

        });


        db.find('mydb', {}).then(val => {

            console.log('\n--Query Result--\n');
            console.log(val);

        });

        db.remove('mydb', {name}).then(val=>{

            console.log('\n--Removed--\n');
            console.log(val);

        });



        readline.close()
      });


});