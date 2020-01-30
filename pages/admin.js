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
        lged(guide);
        tf = true;
      }
    });  
    if(tf == false) {
      alert('Girdiğiniz bilgilerle eşleşen bir kullanıcı bulunamadı. Lütfen tekrar deneyiniz');
    }
  }
});
function lged() {

  var area = document.getElementById('login_div');area.parentNode.removeChild(area);

  var fss = [];
  
  db.collection('posts').get().then(snapshot => {
    setupGuides(snapshot.docs);
  
  });

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
      //console.log(this.getElementsByTagName('span'));
      })}

      fss[fss.length] = () => {document.getElementsByClassName('miniblog')[index].getElementsByTagName('span')[0].addEventListener('click', () => {
        edit(guide);
      })}

      fss[fss.length] = () => {document.getElementsByClassName('miniblog')[index].getElementsByTagName('span')[1].addEventListener('click', () => {
        del(guide);
      })}
  
    })
//  document.getElementById('alan');

for(var i = 0;fss[i] != undefined;i++){
  fss[i]();
}

  }

  
  
}

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

console.log(pos);

  var space = document.createElement('div');
  var editArea = document.createElement('div');

  editArea.id = 'editArea';
  space.id = 'space';

  space.style = 'width:100vw;height:100vh;z-index:1;position: fixed;background:rgba(5,5,5,0.7);top:0;left:0;';
  space.innerHTML = '<div ondblclick="var space = document.getElementById(\'space\');var el = document.getElementById(\'editArea\');el.parentNode.removeChild(el);space.parentNode.removeChild(space);" style="width:100vw;height:100vh;"></div>'

  editArea.style = 'overflow-y:auto;overflow-x: hidden;width:95vw;height:90vh;margin-left:2.5vw;margin-top:-63vh;background:rgb(25,25,25);position:fixed;z-index:2;padding:0;<iframe name="textarea" style="width:100%;border:1px solid black;height:60%;"></iframe>'
  editArea.innerHTML = '<div class="control-panel" style="width:100%;height:4.5%;background:lightgray;"></div>'+
  '<p style="margin-top:1.5vh;font-size:250%;padding-left:6%;margin-bottom:0">Başlık</p><input value="'+pos.title+'" style="width:90%;margin-left:5%;height:5.5%;background:rgb(25,25,25);border:1px solid white;color:white;padding-left:1%;">'+

  '<br /><span style="font-size:150%;margin-top:1%;margin-left:6.5%">Blog Resmi</span><input value="'+pos.image+'" style="width:15%;margin-top:1%;margin-left:1%;height:5.5%;background:rgb(25,25,25);border:1px solid white;color:white;padding-left:1%;">'+
  '<span style="font-size:150%;margin-top:1%;margin-left:3%">Blog Podcast\'i</span><input value="'+pos.audio+'" style="width:15%;margin-top:1%;margin-left:1%;height:5.5%;background:rgb(25,25,25);border:1px solid white;color:white;padding-left:1%;"></input>'+
  '<span style="font-size:150%;margin-top:1%;margin-left:3%">Blog Adresi</span><input value="'+pos.slug+'" style="width:15%;margin-top:1%;margin-left:1%;height:5.5%;background:rgb(25,25,25);border:1px solid white;color:white;padding-left:1%;"></input>'+
  
  '<div id="iframe_resizer" style="float:left;padding:0;margin-top:3vh;width:60%;height:80%;overflow-y: hidden;overflow-x:hidden;"><iframe name="textarea" style="float:left;width:100%;height:100%;border:1px solid white;color:white"></iframe></div>'+
  '<div id="bloghtml" style="margin-bottom:2%;overflow:auto;float:left;margin-top:3vh;height:80%;width:40%;background:rgb(65,65,65);color:black;">asd</div>'+
  
  '<div data-aos="zoom-in"  class="blog" style="margin-left:1%;width:0">'+
  '<img class="image" src="'+pos.image+'" style=\'width:18vw;height: 18vh;float: left;margin-right: 0.5vw;border-radius: 5px\'></img>'+
  '<div class="text" style=\'width: 70vw;height:15vh;\'>'+
      '<p class="title" style=\'padding-top: 0.5vh;font-weight: bold; font-size: 200%; margin:0vw\'>&nbsp;&nbsp;'+pos.title+'</p>'+
      '<p class="intext"> '+pos.details+'</p>'+
      '<p class="date">'+pos.data+'</p>'+
  '</div>'+
  '<div class="overlay"><span onclick="document.getElementsByTagName(\'audio\')['+0+'].play();"><i style="cursor: pointer; width: 2.2vw;margin-left: 0.3vw; margin-right: 0.2vw;" class="fas fa-play"></i></span><span onclick="document.getElementsByTagName(\'audio\')['+0+'].pause();"><i  style="cursor: pointer; width: 2.2vw;margin-left: 0.2vw; margin-right: 0.2vw;" class="fas fa-pause"></i></span><span onclick="location.href = \''+''+'\'"><i  style="cursor: pointer; width: 3vw;margin-left: 0.2vw; margin-right: 0.5vw;" class="fas fa-eye"></i></span></div>'+
  '<audio style= "visibility: hidden" class="audi" controls>'+
          '<source src= "'+pos.audio+'" type="audio/ogg"></source>'+
        'Your browser does not support the audio element.'+
        '</audio>'+
  '</div>'+

  '<div data-aos="fade-up" style="margin-left:78%" class="miniblog">'+
        '<div style="margin-left: 0vw;width:18vw;height: 44vh;overflow: hidden;text-align: center;margin-right: 5vw;">'+
            '<img class="mini-image" style="border-radius: 5px;width:100%;height:45%;" src="'+pos.image+'"></img>'+
            '<div class="text"><p class="title" style="padding-top: 0.5vh;font-weight: bold;font-size: 200%;text-align:center;margin:0;margin-bottom: -1.5vh">'+pos.title+'</p>'+
            '<p style="font-size: 120%">'+pos.details+'</p>'+
        '</div>'+
        '</div>'+
        '<div class="mini-overlay"><span><i  style="cursor: pointer; margin-right: 1vw; margin-left: 1vw; font-size: 250%;height: 2.5vw;" class="fas fa-edit"></i></span><span><i  style="cursor: pointer; margin-right: 1vw; margin-left: 9vw; font-size: 250%;height: 2.5vw;" class="fas fa-times-circle"></i></span></div>'+
        '</div>'+

        '<div style="width:100%;height:1%;margin-bottom: 10%;"></div>'+
          '<div class="comment_edit"></div>'


  document.body.appendChild(space);
  document.body.appendChild(editArea);


  for(var i = 0; pos.comments[i] != undefined;i++){
    document.getElementById('comment_edit').innerHTML += '';
  }


    
    textarea.document.body.style.background = 'rgb(230,230,230)';
    textarea.document.designMode = "on";
    textarea.document.body.style.overflow = 'scroll';
    textarea.document.body.innerHTML = pos.details;
    
    
    function myFunction(event) {
      if (event.keyCode == 16) {
        // Execute command if user presses the SHIFT button:
        document.execCommand("bold");
      }
    }
     
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
