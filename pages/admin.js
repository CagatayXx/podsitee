import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

var app;
var auth;
var db;
 
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
  //console.log(snapshot.docs);
  setupGuides(snapshot.docs);
});

//db.settings({ timestampsInSnapshots: true });
 console.log('');
}

//sa


const voiceEvent = (ev,n) => {
  var audii = document.getElementsByTagName('audio')[n];
    if(ev == 'play'){
      audii.play();
    }

    else if(ev == 'pause'){
      audii.pause();
    }
}

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

    console.log("Al dat: " +  dat);

    //console.log(guide);
  });
}

const login = () => {
  var blogs = document.getElementsByClassName('miniblog');

  var login_div = document.getElementById('login_div');

//username
//email
//password

  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  var auth = false;

  console.log(username + " " + email + " " + password);

  console.log(dat[1]);


  for(var i = 0; dat[i] != undefined;i++){
    console.log(dat[i]);
    if(username == dat[i].username && email == dat[i].email && password == dat[i].password){
      auth = true;
      console.log("bir");
      
      //console.log('Username: ' + username + ', Password: ' + password + ', E-mail: ' + email);

      login_div.style.visibility = 'hidden';
      login_div.style.marginTop = '-25vh';
    
      var div = document.createElement('div');
      div.style = 'font-size:150%;text-align:center;position:fixed; z-index:2; left:1vw; top:1vh; width: 20vw; height: 30vh; color: white';
      div.innerHTML = '<img style="width:22%;height:25%;border-radius:50%;" src="'+dat[i].image+'"></img><br /><span>'+username+'</span><br /><span>'+email+'</span>';
      
      document.body.appendChild(div);
      
      for(var i = 0;blogs[i] != undefined;i++){
        blogs[i].style.visibility = 'visible';
      }
}
  }

}
const Home = ({ posts }) => (
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
    <button className='signin' onClick={() => {login();}}>Giriş Yap</button>
  </div>

<div style={{ float: 'left', paddingLeft: '2vw', width: '1px', height:'1px', marginBottom: '0vh' }}></div>

{posts.map((post,index) => (
  
<div style={{ visibility: 'hidden' }} className="miniblog" onMouseOver= {() => {deneme(index, 'over', 'mini')}} onMouseOut= {() => {deneme(index, 'out', 'mini')}}>


<div style={{ marginLeft: "0vw",width:"18vw",height:"44vh",overflow: "hidden",textAlign: "center", float: "left",marginRight: "5vw" }}>
    <img className="mini-image" style={{ borderRadius: "5px",width:"100%",height:"45%" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6RCB17kHh1r9Rcyd8p7cC2GiRL-PL41EpNjqMd9tvde7eLviz"></img>
    <div className="text"><p className="title" style={{ paddingTop: "0.5vh",fontWeight: "bold",fontSize: "200%",textAlign:"center",margin:0,marginBottom: "-1.5vh" }}>{post.title}</p>
    <p style={{ fontSize: "120%" }}>{ post.details }</p>
</div>

</div>

<div className="mini-overlay"><span onClick={() => { voiceEvent('play', index) }}><i  style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-play"></i></span> <span onClick={() => { voiceEvent('pause', index) }}><i style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-pause"></i></span> <Link href={post.slug}><span><i style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-eye"></i></span></Link></div>

</div>

))}

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
