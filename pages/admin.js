import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Fragment } from 'react' // react version > 16.0

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');


var markdown = require( "markdown" ).markdown;


const deneme = (n,i,t) => {

/*onmouseover="
this.getElementsByClassName('mini-overlay')[0].style = 'background-color: rgba(10,10,10,0.6);color:white';
this.getElementsByClassName('text')[0].style = 'color:rgba(255,255,255,0.1)';"

onmouseout="
this.getElementsByClassName('mini-overlay')[0].style = 'background-color: rgba(10,10,10,0);color:rgba(0,0,0,0)';
this.getElementsByClassName('text')[0].style = 'color:white'"
*/

if(t=='mini'){
  var mtblog = document.getElementsByClassName('miniblog')[n];
  var moverlay = mtblog.getElementsByClassName('mini-overlay')[0];
  var mtext = mtblog.getElementsByClassName('text')[0];

  if(i == 'over'){
    moverlay.style = 'background-color: rgba(10,10,10,0.6);color:white';
    mtext.style = 'color:rgba(255,255,255,0.1)';
  }

  else if(i == 'out'){
    moverlay.style = 'background-color: rgba(10,10,10,0);color:rgba(0,0,0,0)';
    mtext.style = 'color:white';
  }

}


else if(t == 'norm') {
  var tblog = document.getElementsByClassName('blog')[n];
  var overlay = tblog.getElementsByClassName('overlay')[0];
  var text = tblog.getElementsByClassName('text')[0];
  var date = tblog.getElementsByClassName('date')[0];
  
  if(i == 'over'){
    overlay.style='background-color: rgba(10,10,10,0.8);color: white';
    text.style.color='rgba(255,255,255,0.1)';
    date.style = 'margin-left:88%;color:white';
  }
  
  else if(i == 'out'){
    overlay.style = '';
    text.style.color='rgb(255,255,255)';
    date.style = 'margin-left:75%;color:rgba(0,0,0,0)'
  }
}
}

var dat = [];

const setupGuides = (data) => {
  data.forEach(doc => {
    const guide = doc.data();

    dat[dat.length] = guide;


  });
}

const logi = () => {
  var login_div = document.getElementById('login_div');

  //username
  //email
  //password
  
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


  var app;
var auth;
var db;

var tf = false;

var fss = [];
 
if (!firebase.apps.length) {
var app = firebase.initializeApp({
  apiKey: "AIzaSyDsFYYLAAawpDwCAqx3xtr3pwJ9H2W5ve0",
  authDomain: "podsi-698db.firebaseapp.com",
  databaseURL: "https://podsi-698db.firebaseio.com",
  projectId: "podsi-698db",
  storageBucket: "podsi-698db.appspot.com",
  messagingSenderId: "419080800741",
  appId: "1:419080800741:web:971d4f0450ae033b45470c",
  measurementId: "G-016C5ZPB9S"
 });
 auth = firebase.auth();
 db = firebase.firestore();

 db.collection('password').get().then(snapshot => {
  control(snapshot.docs);

   function control(daat){
    daat.forEach((doc, index) => {
      const guide = doc.data();

      if(username == guide.username && email == guide.email && password == guide.password){
        loged(guide);
        tf = true;
      }
    });  
    if(tf == false) {
      alert('Girdiğiniz bilgilerle eşleşen bir kullanıcı bulunamadı. Lütfen tekrar deneyiniz');
    }
  }
});
function loged(dat) {

  var area = document.getElementById('login_div');area.parentNode.removeChild(area);

  var div = document.createElement('div');
  div.style = 'font-size:150%;text-align:center;position:fixed; z-index:1; left:1vw; top:1vh; width: 20vw; height: 30vh; color: white';
  div.innerHTML = '<img style="width:22%;height:25%;border-radius:50%;" src="'+dat.image+'"></img><br /><span>'+dat.username+'</span><br /><span>'+dat.email+'</span>';
  
  document.body.appendChild(div);


  db.collection('posts').get().then(snapshot => {
    setupGuides(snapshot.docs);
  });
  }
  
  var fss = [];
  
  const setupGuides = (data) => {

    data.forEach((doc, index) => {
      const guide = doc.data();
  
      document.getElementById('alan').innerHTML += '<div data-aos="fade-up" class="miniblog">'+
        '<div style="margin-left: 0vw;width:18vw;height: 44vh;overflow: hidden;text-align: center; float: left;margin-right: 5vw">'+
            '<img class="mini-image" style="border-radius: 5px;width:100%;height:45%;" src="'+guide.image+'"></img>'+
            '<div class="text"><p class="title" style="padding-top: 0.5vh;font-weight: bold;font-size: 200%;text-align:center;margin:0;margin-bottom: -1.5vh">'+guide.title+'</p>'+
            '<p style="font-size: 120%">'+guide.details+'</p>'+
        '</div>'+
        '</div>'+
        '<div class="mini-overlay"><span><i  style="cursor: pointer; margin-right: 1vw; margin-left: 1vw; font-size: 250%;height: 2.5vw;" class="fas fa-edit"></i></span><span><i  style="cursor: pointer; margin-right: 1vw; margin-left: 9vw; font-size: 250%;height: 2.5vw;" class="fas fa-times-circle"></i></span></div>'+
        '</div>';


fss[fss.length] = () => {document.getElementsByClassName('miniblog')[index].addEventListener("mouseover", function(){
  deneme(index,'over','mini');
});
}

fss[fss.length] = () => {document.getElementsByClassName('miniblog')[index].addEventListener("mouseout", function(){
deneme(index,'out','mini');
console.log(this.getElementsByTagName('span'));

this.getElementsByTagName('span')[0].addEventListener('click', () => {
  edit(guide);
});

this.getElementsByTagName('span')[1].addEventListener('click', () => {
  del();
});

});
}
      
});
for(var i = 0;fss[i] != undefined;i++){
  fss[i]();
}

  }

}



}


const edit = (pos) => {
  var space = document.createElement('div');
  var editArea = document.createElement('div');

  editArea.id = 'editArea';
  space.id = 'space';

  space.style = 'width:100vw;height:100vh;z-index:1;position: fixed;background:rgba(5,5,5,0.7);top:0;left:0;';
  space.innerHTML = '<div ondblclick="var space = document.getElementById(\'space\');var el = document.getElementById(\'editArea\');el.parentNode.removeChild(el);space.parentNode.removeChild(space);" style="width:100vw;height:100vh;"></div>'

  editArea.style = 'overflow: hidden;width:50vw;height:95vh;margin-left:25vw;margin-top:-68vh;background:rgb(25,25,25);position:fixed;z-index:2;padding:0;'
  editArea.innerHTML ='<input style="margin-left:0;" type="text" value="'+pos.title+'"></input><br /><input type="text" value="'+pos.image+'"></input><br /><input type="text" value="'+pos.audio+'"></input><br /><textarea>'+pos.details+'</textarea><br /><input type="text" value="'+pos.date+'"></input>';
  
  document.body.appendChild(space);
  document.body.appendChild(editArea);
}

const del = () => {

}

const Home = ( { posts }) => (
  <div className="container">
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/style.css"></link>
      <link rel='stylesheet' href='/admin-style.css'></link>
      <link rel="stylesheet" href="/all.css"></link>
      <script src="/all.js"></script>

      <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script src='/script.js'></script>
    </Head>

  <div>
    <div style= {{ marginLeft: '18vw', width: '32vw', height: '59vh', marginTop: '-3vh', border: '1px solid rgb(25,25,25)'}}>
    <img style= {{ width: '100%', marginBottom: '-30%', height:'100%'}} src='/cerceve.gif'></img>  
    <img style= {{ marginLeft: '7.7%', width: '85%', marginTop: '-100%', height: '15vh'}} src="/gif.gif"></img>
    </div>
    
  </div>

  <div id='login_div' className='login' style= {{ marginTop: '0.5vh' }}>
    <input type="text" id='username' placeholder='Kullanıcı Adı'></input>
    <input type='text' id='email' placeholder='E-posta'></input>
    <input type='password' id='password' placeholder='Şifre'></input>
    <button className='signin' onClick={() => {logi();}}>Giriş Yap</button>
  </div>

<div style={{ float: 'left', paddingLeft: '2vw', width: '1px', height:'1px', marginBottom: '0vh' }}></div>

<div id="alan"></div>

    <style jsx>{`
.miniblog svg {
  height: 2.5vw;
}

      .container {
        width: 71.5vw;
        margin: 0 auto;
      }
    `}</style>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch("http://localhost:3000/api/posts");
  const json = await res.json();
  return { posts: json.posts };
};

export default Home;
