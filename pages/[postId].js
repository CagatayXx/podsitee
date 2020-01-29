 
import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

var Cookie = require('js-cookie');

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

var app;
var auth;
var db;

var slg;

var user;

const makecommit = (username,userimage,date,comment) => {
  
if(comment.charAt(29) != '')
{  
  var docRef = db.collection("posts").doc(slg);
  //console.log(docRef.docs);
  
  docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().comments);
        var news = [];

        var comments = doc.data().comments;
        console.log(userimage);
        
        //console.log([comments,{},{}])

        news[news.length] = {
          username,
          userimage,
          date,
          like:'0',
          dislike:'0',
          comment
        };

        for(var i = 0;comments[i] != undefined;i++){
          news[news.length] = comments[i];
          console.log('bu');
        }

        document.getElementById('textarea').value = '';

        document.getElementById('newcomment').innerHTML += '<div class="comment" style="margin-left:9vw;width:55vw;margin-bottom:6vh">'+
            '<div class="user" style="border-radius: 50%;background-color: rgb(97, 97, 97);width:4.2vw;height:7.3vh;float: left;">'+
                '<i style="font-size: 250%;margin-left: 0.5vw;margin-top: 0.4vh;color:white;width:80%;height:80%;" class="fas fa-user"></i><p style="margin-top: -5vh;margin-left: 5vw;font-size: 180%;margin-right: 1vw;float: left;">'+username+'</p>'+
            '</div>'+
            '<p style="float:left;margin-left: 60%;margin-top: 6vh;color:lightgray">'+date+'</p>'+
            '<p style="height:8vh"></p>'+
            '<p style="max-height:15vh;margin-left: -0.5vw;width:50vw;margin-top: -0.5vw;overflow: auto;font-size:150%;">'+comment+'</p>'+
            '<div class="like" style="margin-top: -1%;margin-left:70%;font-size: 150%;">'+
                '<i style="cursor: pointer;width:12%;height:12%;float:left" class="fas fa-thumbs-up"></i><p style="margin-right: 10%;margin-left:1%;margin-top:1%;float:left">0</p>'+
                '<i style=";margin-top:3%;float:left;cursor: pointer;width:12%;height:12%;margin-right:1.5%" class="fas fa-thumbs-down"></i><p style="margin-top:1%;margin-left:10%;">0</p>'+
            '</div>'+
        '</div><p></p>'

        //console.log(news);
        console.log("Yorumunuz başarıyla oluşturuldu.")
        var updateTimestamp = docRef.update({
          comments: news
        });
        
    }
})
}
else {
  alert('Yaptığınız yorum çok kısa. En az 30 karakterden oluşmalı.');
}
}


if (typeof window !== 'undefined') {
  //AOS.init()

  const setupGuides = (data) => {
    var tf = false;
    
      data.forEach((doc, index) => {
        const guide = doc.data();
    
    console.log();
    
        if('http://localhost:3000/' + guide.slug == location.href){
        tf=true;

        slg = guide.slug;
    
          document.title = guide.title;
          console.log(guide.comments[0]);
    
          document.getElementById('blog-pattern').innerHTML = '<div class="blog">'+
          '<h2 class="blog-title" style="margin-top: 11vh;">'+
          '<a class="title">'+guide.title+'</a>'+
          '</h2>'+
          '<div class="blog-text">'+
          '<img class="blog-image" src="'+guide.image+'"></img>'+
          '<p class="text">'+guide.details+'</p>'+
          '<div style="color:white" class="date">'+guide.date+'</div>'+
          '</div>'+
          '<p></p><i style="cursor: pointer;width:4.5%;height:4.5%;margin-bottom:5vh;float:left" class="fas fa-thumbs-up"></i><p style="text-decoration: underline;font-size:130%;margin-left:5%;margin-top:3.3%;cursor: pointer;">Bu Yazıyı Beğen</p>'+
          '</div>';
    
          for(var i = 0;guide.comments[i] != undefined;i++){
            document.getElementById('comments').innerHTML += '<div class="comment" style="margin-left:9vw;width:85%;margin-bottom:6vh">'+
            '<div class="user" style="border-radius: 50%;background-color: rgb(97, 97, 97);width:4.2vw;height:7.3vh;float: left;">'+
                '<i style="font-size: 250%;margin-left: 0.5vw;margin-top: 0.4vh;color:white;width:80%;height:80%;" class="fas fa-user"></i><p style="margin-top: -5vh;margin-left: 5vw;font-size: 180%;margin-right: 1vw;float: left;">'+guide.comments[i].username+'</p>'+
            '</div>'+
            '<p style="float:left;margin-left: 60%;margin-top: 6vh;color:lightgray">'+guide.comments[i].date+'</p>'+
            '<p style="height:8vh"></p>'+
            '<p style="max-height:15vh;margin-left: -0.5vw;width:50vw;margin-top: -0.5vw;overflow: auto;font-size:150%;">'+guide.comments[i].comment+'</p>'+
            '<div class="like" style="margin-top: -1%;margin-left:70%;font-size: 150%;">'+
                '<i style="cursor: pointer;width:12%;height:12%;float:left" class="fas fa-thumbs-up"></i><p style="margin-right: 10%;margin-left:1%;margin-top:1%;float:left">'+guide.comments[i].like+'</p>'+
                '<i style=";margin-top:3%;float:left;cursor: pointer;width:12%;height:12%;margin-right:1.5%" class="fas fa-thumbs-down"></i><p style="margin-top:1%;margin-left:10%;">'+guide.comments[i].dislike+'</p>'+
            '</div>'+
        '</div><p></p>'
          }

        }
      });
      if(tf== false){
        location.href="/"
      }
    }
 
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

 db.collection('posts').get().then(snapshot => {
  
  setupGuides(snapshot.docs);
});


db.collection('users').get().then(snapshot => {

  authenticate(snapshot.docs);

});

const authenticate = (data) => {
   user = "";
  
    data.forEach((doc, index) => {
      const guide = doc.data();

      if(guide.username == Cookie.get('username') && guide.password == Cookie.get('password')){
        console.log('Giriş Yapılmış');
        user = guide;
        var auth_button = document.getElementsByClassName('auth_button');

        
        auth_button[0].parentNode.removeChild(auth_button[0]);
        auth_button[0].parentNode.removeChild(auth_button[0]);

        setTimeout(() => {
          if(guide.image==""){
            document.getElementById('navbar').innerHTML += '<div class="user_info"><div id="user-bg" class="user-bg user_image_div" style="margin-left:55vw;float:left;background:gray;border-radius:50%;width:3.5vw;height:6vh;margin-top:-2vh"><i style="width:4.5vw;height:4.5vh;margin-left:-0.5vw;margin-top:0.25vw" class="fas fa-user"></i></div><p style="font-size:1.5vw;padding-top:-4vw;margin-top:1.5vw" id="username_p">&nbsp;'+guide.username+'</p></div>';
          }
          else {
            document.getElementById('navbar').innerHTML += '<div class="user_info"><div id="user-bg" class="user-bg" style="margin-left:55vw;float:left;border-radius:50%;width:3.5vw;height:6vh;margin-top:1vh"><i style="width:4.5vw;height:4.5vh;margin-left:-0.5vw;margin-top:0.25vw"></i></div><img id="user_image_div" style="margin-left:-3.5vw;float:left;border-radius:50%;width:3.5vw;height:6vh;margin-top:1vh;" class="user_image user_image_div" src="'+guide.image+'"></img><p id="username_p" style="font-size:1.5vw;padding-top:2.5vh;">&nbsp;'+guide.username+'</p></div>';
          }
          
          setTimeout(() => {
          document.getElementById('user-bg').style.marginLeft = '67vw';
          setTimeout(() => {
          document.getElementById('user-bg').style.webkitTransition = undefined;
          document.getElementById('user-bg').style.transition = undefined;  
          }, 1500);
          }, 10);
        }, 500);
        
      }
    })
  }

}
}


 
const signup = () => {
  var space = document.createElement('div');
  var login_div = document.createElement('div');
  
  space.id = 'space';
  login_div.id = 'logdiv'
  
  space.innerHTML = '<div onclick="var space = document.getElementById(\'space\');space.parentNode.removeChild(space);var logdiv = document.getElementById(\'logdiv\');logdiv.parentNode.removeChild(logdiv);" style="width:100vw;height:100vh;z-index:5;position:fixed;background:rgba(0,0,0,0.5);left:0;top:0;"></div>'
  login_div.innerHTML = '<div data-aos="zoom-in" style="text-align:center;width:30vw;height:60vh;background:rgba(25,25,25,1);z-index:5;position:fixed;left:35vw;top:15vh;"><h1 class="login-title">Kayıt Ol</h2><input id="username" class="login-input" type="text" placeholder="Kullanıcı Adı"><br /><input id="email" class="login-input" type="text" placeholder="E-Posta"><br /><input type="password" id="password" class="login-input" type="text" placeholder="Şifre"><br /><input type="password" id="re-password" class="login-input" type="text" placeholder="Şifre Tekrar"><br /><button id="log_but" class="login-button">Kayıt Ol</button></div>'
  
  document.body.appendChild(space);
  document.body.appendChild(login_div);
 
  var log_but = document.getElementById('log_but');
 
 
  log_but.addEventListener('click', () => {
 
 var username = document.getElementById('username').value;
 var email = document.getElementById('email').value;
 var password = document.getElementById('password').value;
 var repassword = document.getElementById('re-password').value;
 
 var tf = true;
 
 if(username != '' && email != '' && password != '' && repassword != ''){
   console.log('Boş değil');
 
 
   db.collection('users').get().then(snapshot => {
     //console.log(snapshot.docs);
     setupGuides(snapshot.docs);
    });
  
    const setupGuides = (data) => {
  
  
      data.forEach((doc, index) => {
        const guide = doc.data();
 
        if(guide.username == username){
         tf = false;
        }
 
         console.log(guide.username);
         
      
        console.log("alll: " +  guide);
      });
      if(!tf){
        alert('Bu isim zaten kullanılmakta');
      }
      
 
      else {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 if(email.match(mailformat))
 {
 
 if(password == repassword){
 
   if(password.charAt(5) != ''){
     log_but.style = '';log_but.style.width = '0'; log_but.style.height = '0';log_but.innerHTML = '';
 
     if(space != undefined){
       space.parentNode.removeChild(space);
       login_div.parentNode.removeChild(login_div);
 }
 
     var auth_button = document.getElementsByClassName('auth_button');
 
     auth_button[0].style.marginLeft = '110vw';
 
     setTimeout(() => {
       auth_button[0].parentNode.removeChild(auth_button[0]);
       auth_button[0].parentNode.removeChild(auth_button[0]);
         document.getElementById('navbar').innerHTML += '<div class="user_info"><div id="user-bg" class="user-bg user_image_div" style="margin-left:55vw;float:left;background:gray;border-radius:50%;width:3.5vw;height:6vh;margin-top:1vh"><i style="width:4.5vw;height:4.5vh;margin-left:-0.5vw;margin-top:0.25vw" class="fas fa-user"></i></div><p style="font-size:1.5vw;padding-top:2.5vh;" id="username_p">&nbsp;'+username+'</p></div>';
       
 
       setTimeout(() => {
       document.getElementById('user-bg').style.marginLeft = '67vw';
       setTimeout(() => {
       document.getElementById('user-bg').style.webkitTransition = undefined;
       document.getElementById('user-bg').style.transition = undefined;  
       }, 1500);
       }, 10);
     }, 500);
     
 
     Cookie.set('username', username);
     Cookie.set('password', password);
   
     
       alert("Artık Hazırsın");
   var newCityRef = db.collection("users").doc();
 
   newCityRef.set({
     username: username,
     email: email,
     password: password,
     liked: [],
     disliked: [],
     image: ""
    });
 
    log_but.style = '';log_but.style.width = '0'; log_but.style.height = '0';log_but.innerHTML = '';
 
 
   }
   else {
     alert('Kullanmak istediğiniz şifre çok kısa');
   }
 }
 
 else {
   alert('Şifreleriniz uyuşmuyor');
 }
 
 
    
   
 }
 else {
   alert('Kullandığınız E-Posta Uygun Değil');
   
 }
 
     } 
   }
 }
 else {
   alert('Verilen alanların hiçbiri boş bırakılamaz');
 }
 
 
 
 
 
  });
 }
  
 const login = () => {
  var space = document.createElement('div');
  var login_div = document.createElement('div');
  
  space.id = 'space';
  login_div.id = 'logdiv'
  
  space.innerHTML = '<div onclick="var space = document.getElementById(\'space\');space.parentNode.removeChild(space);var logdiv = document.getElementById(\'logdiv\');logdiv.parentNode.removeChild(logdiv);" style="width:100vw;height:100vh;z-index:5;position:fixed;background:rgba(0,0,0,0.5);left:0;top:0;"></div>'
  login_div.innerHTML = '<div data-aos="zoom-in" style="text-align:center;width:30vw;height:60vh;background:rgba(25,25,25,1);z-index:5;position:fixed;left:35vw;top:15vh;"><p style="margin-top:12%"></p><h1 class="login-title">Giriş Yap</h2><p style="margin-top:8%"></p><input id="username" class="login-input" type="text" placeholder="Kullanıcı Adı"><br /><input type="password" id="password" class="login-input" type="text" placeholder="Şifre"><br /><button id="log_but" class="login-button">Giriş Yap</button></div>'
  
  document.body.appendChild(space);
  document.body.appendChild(login_div);
 
  var log_but = document.getElementById('log_but');
 
 
  log_but.addEventListener('click', () => {
 
 var username = document.getElementById('username').value;
 var password = document.getElementById('password').value;
   
 var tf = false;
 
   db.collection('users').get().then(snapshot => {
     //console.log(snapshot.docs);
     setupGuides(snapshot.docs);
    });
  
    const setupGuides = (data) => {
      data.forEach((doc, index) => {
        const guide = doc.data();
 
        if(guide.username == username && guide.password == password){
         //console.log('Hoşgeldiniz ' + username);
 if(space != undefined){
         space.parentNode.removeChild(space);
         login_div.parentNode.removeChild(login_div);
 }
         var auth_button = document.getElementsByClassName('auth_button');
 
         auth_button[0].style.marginLeft = '110vw';
 
         setTimeout(() => {
           auth_button[0].parentNode.removeChild(auth_button[0]);
           auth_button[0].parentNode.removeChild(auth_button[0]);
           if(guide.image==""){
             document.getElementById('navbar').innerHTML += '<div class="user_info"><div id="user-bg" class="user-bg user_image_div" style="margin-left:55vw;float:left;background:gray;border-radius:50%;width:3.5vw;height:6vh;margin-top:1vh"><i style="width:4.5vw;height:4.5vh;margin-left:-0.5vw;margin-top:0.25vw" class="fas fa-user"></i></div><p style="font-size:1.5vw;padding-top:2.5vh;" id="username_p">&nbsp;'+guide.username+'</p></div>';
           }
           else {
             document.getElementById('navbar').innerHTML += '<div class="user_info"><div id="user-bg" class="user-bg" style="margin-left:55vw;float:left;border-radius:50%;width:3.5vw;height:6vh;margin-top:1vh"><i style="width:4.5vw;height:4.5vh;margin-left:-0.5vw;margin-top:0.25vw"></i></div><img id="user_image_div" style="margin-left:-3.5vw;float:left;border-radius:50%;width:3.5vw;height:6vh;margin-top:1vh;" class="user_image user_image_div" src="'+guide.image+'"></img><p id="username_p" style="font-size:1.5vw;padding-top:2.5vh;">&nbsp;'+guide.username+'</p></div>';
           }
           
           setTimeout(() => {
           document.getElementById('user-bg').style.marginLeft = '67vw';
           setTimeout(() => {
           document.getElementById('user-bg').style.webkitTransition = undefined;
           document.getElementById('user-bg').style.transition = undefined;  
           }, 1500);
           }, 10);
         }, 500);
         
 
         Cookie.set('username', username);
         Cookie.set('password', password);
         
 
 
         tf = !tf;
        }
      });
      if(!tf){
        alert('Kullanıcı adı yada şifre hatlı');
      }
    }
 
  });
 }
 



const BlogPost = ( { post }) => (

  <div className="container">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel='stylesheet' href='/blog-style.css'></link>
           <link rel="stylesheet" href="/style.css"></link>
     <link rel="stylesheet" href="/all.css"></link>
     <script src="/all.js"></script>
    </Head>
    <div id="navbar" style={{left: 0 }} class="navbar_fixed"><img onClick={()=> {location.href="/sad"}} src="/Logo.png" style= {{ cursor: 'pointer' ,marginLeft: '0.2%',width:'19.7vw', height: '100%', float: 'left', marginTop: '0.1vw'}}></img><button style={{marginLeft: '61vw'}} className='auth_button' onClick={() => {signup()}}>Kayıt Ol</button><button className='auth_button' onClick={() => {login()}}>Giriş Yap</button></div>
    <div id="blog-pattern">


    </div>
    <div style={{ marginTop: '0vh' }} className="your_comment">
        <textarea id="textarea" style={{ marginLeft:'5vw' ,marginBottom: '0vh', border: 'none' ,width:'85%', resize: "none", height: 'unset', color: 'white', background: 'rgb(30,30,30)', fontSize: '120%', paddingTop: '0.5vw', paddingBottom: '1vw' }}></textarea><br />
    <button style={{marginBottom: '1vh'}} onClick={() => {makecommit(user.username,user.image,'19 Aralık 2020',document.getElementById("textarea").value)}} className="commit_button">Yorum Yap</button>
        </div>
        <div id="newcomment"></div>
    <div id="comments">


      
    </div>
  </div>
);

BlogPost.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(`http://localhost:3000/api/post/${query.postId}`);
  const json = await res.json();
  /*if(json.post == undefined){
    return { post:  {
      title: 'Bilinmeyen Sayfa!',
      slug: '',
      details: '',
      date: '',
      audio: ''
    } }
  }*/
  return { post: json.post };
};

export default BlogPost;
