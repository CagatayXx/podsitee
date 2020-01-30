 
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
  console.log(user);
if( user != "" ){
  mkk(username,userimage,date,comment);
}

else {
  var space = document.createElement('div');
  var login_div = document.createElement('div');
  
  space.id = 'space';
  login_div.id = 'logdiv'
  
  space.innerHTML = '<div onclick="var space = document.getElementById(\'space\');space.parentNode.removeChild(space);var logdiv = document.getElementById(\'logdiv\');logdiv.parentNode.removeChild(logdiv);" style="width:100vw;height:100vh;z-index:5;position:fixed;background:rgba(0,0,0,0.5);left:0;top:0;"></div>'
  login_div.innerHTML = '<div data-aos="zoom-in" style="text-align:center;width:30vw;height:60vh;background:rgba(25,25,25,1);z-index:5;position:fixed;left:35vw;top:15vh;"><h1>Görünüşe Göre Oturum Açmamışsınız</h1><h2>Eğer adının ve fotoğrafının gözükmesini istiyorsan oturum açman gerek</h2><br /><button style="width:45%;height:10%;" id="yorum_kayit" class="auth_button">Kayıt Ol</button><br /><button style="width:45%;height:10%;" id="yorum_giris" class="auth_button">Giriş Yap</button><p></p><button style="width:45%;height:10%;color:rgb(35,35,35);background:white;" id="ziyaretci" class="auth_button ziyaretci">Yorumu Ziyaretçi Olarak Yap</button></div>'
  
  document.body.appendChild(space);
  document.body.appendChild(login_div);
 
document.getElementById('yorum_giris').addEventListener('click', () => {
  space.parentNode.removeChild(space);
  login_div.parentNode.removeChild(login_div);
  login();
});

document.getElementById('yorum_kayit').addEventListener('click', () => {
  space.parentNode.removeChild(space);
  login_div.parentNode.removeChild(login_div);
  signup();
});

document.getElementById('ziyaretci').addEventListener('click', () => {
  space.parentNode.removeChild(space);
  login_div.parentNode.removeChild(login_div);
  mkk('Ziyaretçi','','19 Aralık 2020', comment);
});

}

  function mkk(uusername,uuserimage,ddate,ccomment) {
    var docRef = db.collection("posts").doc(slg);
    //console.log(docRef.docs);
    
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data().comments);
          var news = [];
  
          var comments = doc.data().comments;
          console.log(uuserimage);
          
          //console.log([comments,{},{}])
  
          news[news.length] = {
            username: uusername,
            userimage: uuserimage,
            date: ddate,
            like:'0',
            dislike:'0',
            comment: ccomment
          };
  
          for(var i = 0;comments[i] != undefined;i++){
            news[news.length] = comments[i];
            console.log('bu');
          }
  
          document.getElementById('textarea').value = '';
  
          if(user.image == ""){
            document.getElementById('newcomment').innerHTML += '<div class="comment" style="margin-left:9vw;width:85%;margin-bottom:6vh">'+
            '<div class="user" style="border-radius: 50%;background-color: rgb(97, 97, 97);width:4.2vw;height:7.3vh;float: left;">'+
                '<i style="font-size: 250%;margin-left: 0.5vw;margin-top: 0.4vh;color:white;width:80%;height:80%;" class="fas fa-user"></i><p style="margin-top: -5vh;margin-left: 5vw;font-size: 180%;margin-right: 1vw;float: left;">'+user.username+'</p>'+
            '</div>'+
            '<p style="float:left;margin-left: 60%;margin-top: 6vh;color:lightgray">'+'20 Ekim 2020'+'</p>'+
            '<p style="height:8vh"></p>'+
            '<p style="max-height:15vh;margin-left: -0.5vw;width:50vw;margin-top: -0.5vw;overflow: auto;font-size:150%;">'+ccomment+'</p>'+
            /*'<div class="like" style="margin-top: -1%;margin-left:70%;font-size: 150%;">'+
                '<i style="cursor: pointer;width:12%;height:12%;float:left" class="fas fa-thumbs-up"></i><p style="margin-right: 10%;margin-left:1%;margin-top:1%;float:left">'+guide.comments[i].like+'</p>'+
                '<i style=";margin-top:3%;float:left;cursor: pointer;width:12%;height:12%;margin-right:1.5%" class="fas fa-thumbs-down"></i><p style="margin-top:1%;margin-left:10%;">'+guide.comments[i].dislike+'</p>'+
            '</div>'+*/
        '</div><p></p>'
            }

            else {
              document.getElementById('newcomment').innerHTML += '<div class="comment" style="margin-left:9vw;width:85%;margin-bottom:6vh">'+
            '<div class="user" style="border-radius: 50%;width:4.2vw;height:7.3vh;float: left;">'+  
              '<img id="user_image_div" style="margin-left:-0.2vw;float:left;border-radius:50%;width:4.3vw;float:left;height:7.5vh;margin-top:1vh;" class="user_image user_image_div" src="'+user.image+'"></img><p style="margin-top: -5vh;margin-left: 5vw;font-size: 180%;margin-right: 1vw;float: left;">'+user.username+'</p>'+
            '</div>'+
            '<p style="float:left;margin-left: 60%;margin-top: 6vh;color:lightgray">'+'20 Ekim 2020'+'</p>'+
            '<p style="height:8vh"></p>'+
            '<p style="max-height:15vh;margin-left: -0.5vw;width:50vw;margin-top: -0.5vw;overflow: auto;font-size:150%;">'+ccomment+'</p>'+
            /*'<div class="like" style="margin-top: -1%;margin-left:70%;font-size: 150%;">'+
                '<i style="cursor: pointer;width:12%;height:12%;float:left" class="fas fa-thumbs-up"></i><p style="margin-right: 10%;margin-left:1%;margin-top:1%;float:left">'+guide.comments[i].like+'</p>'+
                '<i style=";margin-top:3%;float:left;cursor: pointer;width:12%;height:12%;margin-right:1.5%" class="fas fa-thumbs-down"></i><p style="margin-top:1%;margin-left:10%;">'+guide.comments[i].dislike+'</p>'+
            '</div>'+*/
        '</div><p></p>'
            }


          //console.log(news);
          console.log("Yorumunuz başarıyla oluşturuldu.")
          var updateTimestamp = docRef.update({
            comments: news
          });
          
      }
  })
  }

}
else {
  alert('Yaptığınız yorum çok kısa. En az 30 karakterden oluşmalı.');
}
}


if (typeof window !== 'undefined') {
  AOS.init()

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
    
            document.getElementById('like_number').innerHTML = guide.like;

          document.getElementById('blog-pattern').innerHTML = '<div class="blog">'+
          '<h2 data-aos="fade-left" class="blog-title" style="margin-top: 11vh;">'+
          '<a class="title">'+guide.title+'</a>'+
          '</h2>'+
          '<div class="blog-text">'+
          '<img data-aos="fade-up" class="blog-image" src="'+guide.image+'"></img><br />'+
          '<audio id="aud" style="visibility:visible;height:0;margin:0;" controls><source src="'+guide.audio+'" type="audio/ogg">Your browser does not support the audio element.</audio><br />'+
          '<div class="audio_div" style="border-radius: 15px;background:rgba(0,0,0,0.5);height:6.5vh;margin-top:-1vh;margin-bottom:-1vh"><span style="margin-left:21vw;" onclick="document.getElementById(\'aud\').play();" style="cursor:pointer"><i style="width:5.5vw;cursor:pointer;height:5.5vh;margin-top:0.5vh" class="fas fa-play"></i></span><span style="margin-left:0.1vw;" onclick="document.getElementById(\'aud\').pause();" style="cursor:pointer"><i style="margin-left:-2.5vw;cursor:pointer;width:5.5vw;height:5.5vh;margin-top:0.5vh" class="fas fa-pause"></i></span></div>'+
          '<p data-aos="fade-left" class="text">'+guide.details+'</p>'+
          '<div style="color:white" class="date">'+guide.date+'</div>'+
          '</div>'+
          //'<p></p><i style="cursor: pointer;width:4.5%;height:4.5%;margin-bottom:5vh;float:left" class="fas fa-thumbs-up"></i><p style="text-decoration: underline;font-size:130%;margin-left:5%;margin-top:3.3%;cursor: pointer;">Bu Yazıyı Beğen</p>'+
          '</div>';
    
          for(var i = 0;guide.comments[i] != undefined;i++){
            if(guide.comments[i].userimage == ""){
            document.getElementById('comments').innerHTML += '<div data-aos="zoom-in" data-aos-delay="500" class="comment" style="margin-left:9vw;width:85%;margin-bottom:6vh">'+
            '<div class="user" style="border-radius: 50%;background-color: rgb(97, 97, 97);width:4.2vw;height:7.3vh;float: left;">'+
                '<i style="font-size: 250%;margin-left: 0.5vw;margin-top: 0.4vh;color:white;width:80%;height:80%;" class="fas fa-user"></i><p style="margin-top: -5vh;margin-left: 5vw;font-size: 180%;margin-right: 1vw;float: left;">'+guide.comments[i].username+'</p>'+
            '</div>'+
            '<p style="float:left;margin-left: 60%;margin-top: 6vh;color:lightgray">'+guide.comments[i].date+'</p>'+
            '<p style="height:8vh"></p>'+
            '<p style="max-height:15vh;margin-left: -0.5vw;width:50vw;margin-top: -0.5vw;overflow: auto;font-size:150%;">'+guide.comments[i].comment+'</p>'+
            /*'<div class="like" style="margin-top: -1%;margin-left:70%;font-size: 150%;">'+
                '<i style="cursor: pointer;width:12%;height:12%;float:left" class="fas fa-thumbs-up"></i><p style="margin-right: 10%;margin-left:1%;margin-top:1%;float:left">'+guide.comments[i].like+'</p>'+
                '<i style=";margin-top:3%;float:left;cursor: pointer;width:12%;height:12%;margin-right:1.5%" class="fas fa-thumbs-down"></i><p style="margin-top:1%;margin-left:10%;">'+guide.comments[i].dislike+'</p>'+
            '</div>'+*/
        '</div><p></p>'
            }

            else {
              document.getElementById('comments').innerHTML += '<div class="comment" data-aos="zoom-in" data-aos-delay="500" style="margin-left:9vw;width:85%;margin-bottom:6vh">'+
            '<div class="user" style="border-radius: 50%;width:4.2vw;height:7.3vh;float: left;">'+  
              '<img id="user_image_div" style="margin-left:-0.2vw;float:left;border-radius:50%;width:4.3vw;float:left;height:7.5vh;margin-top:1vh;" class="user_image user_image_div" src="'+guide.image+'"></img><p style="margin-top: -5vh;margin-left: 5vw;font-size: 180%;margin-right: 1vw;float: left;">'+guide.comments[i].username+'</p>'+
            '</div>'+
            '<p style="float:left;margin-left: 60%;margin-top: 6vh;color:lightgray">'+guide.comments[i].date+'</p>'+
            '<p style="height:8vh"></p>'+
            '<p style="max-height:15vh;margin-left: -0.5vw;width:50vw;margin-top: -0.5vw;overflow: auto;font-size:150%;">'+guide.comments[i].comment+'</p>'+
            /*'<div class="like" style="margin-top: -1%;margin-left:70%;font-size: 150%;">'+
                '<i style="cursor: pointer;width:12%;height:12%;float:left" class="fas fa-thumbs-up"></i><p style="margin-right: 10%;margin-left:1%;margin-top:1%;float:left">'+guide.comments[i].like+'</p>'+
                '<i style=";margin-top:3%;float:left;cursor: pointer;width:12%;height:12%;margin-right:1.5%" class="fas fa-thumbs-down"></i><p style="margin-top:1%;margin-left:10%;">'+guide.comments[i].dislike+'</p>'+
            '</div>'+*/
        '</div><p></p>'
            }

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



   })
  
    data.forEach((doc, index) => {
      const guide = doc.data();

      if(guide.username == Cookie.get('username') && guide.password == Cookie.get('password')){
        console.log('Giriş Yapılmış');
        user = guide;
        var auth_button = document.getElementsByClassName('auth_button');

        
        var dbuser = db.collection("users").doc(user.username);
        console.log(dbuser);
      var tf = true;
      
      
        dbuser.get().then(function(doc) {
      
          for(var i = 0;doc.data().liked[i] != undefined;i++){
            
            if(slg == doc.data().liked[i]){
              tf = false;
            }
          }
      
          if( tf == false){
            if (doc.exists) {
      
              var liked = doc.data().liked;
              console.log(liked);
              
              //console.log([comments,{},{}])
        var news = [];
        
        document.getElementById('like_pls').style.color = 'green';
            }
          }
        });


        
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
   
     user = {
      username: username,
      email: email,
      password: password,
      liked: [],
      disliked: [],
      image: ""
    }
     
       alert("Artık Hazırsın");
  
       db.collection('users').doc(username).set(
        {
          username,
          email,
          password,
          image: '',
          liked: []
      }
       );
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
         
 
         user = {
          username: guide.username,
          email: guide.email,
          password: guide.password,
          liked: guide.liked,
          disliked: guide.disliked,
          image: guide.image
        }

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
 

 function like (){

  const mkk = () => {
    var docRef = db.collection("posts").doc(slg);
    //console.log(docRef.docs);
    
    docRef.get().then(function(doc) {
      var likee = doc.data().like + 1;
  

  var dbuser = db.collection("users").doc(user.username);
  console.log(dbuser);
var tf = true;


  dbuser.get().then(function(doc) {

    for(var i = 0;doc.data().liked[i] != undefined;i++){
      
      if(slg == doc.data().liked[i]){
        tf = false;
      }
    }

    if( tf == true){
      if (doc.exists) {

        var liked = doc.data().liked;
        console.log(liked);
        
        //console.log([comments,{},{}])
  var news = [];
  
  document.getElementById('like_pls').style.color = 'green';

        news[news.length] = slg;
  
        for(var i = 0;liked[i] != undefined;i++){
          news[news.length] = liked[i];
        }
  
        var updateTimestamp = dbuser.update({
          liked: news
        });
      }
      var updateTimestamp = docRef.update({
        like: likee
      });

document.getElementById('like_number').innerHTML = likee;

    }

    else {
      console.log('Bu yazıyı zaten beğenmişsiniz')
    }
    
    
  });
  
});
  }
  
  if( user != "" ){
    mkk();
  }
  
  else {
    var space = document.createElement('div');
  var login_div = document.createElement('div');
  
  space.id = 'space';
  login_div.id = 'logdiv'
  
  space.innerHTML = '<div onclick="var space = document.getElementById(\'space\');space.parentNode.removeChild(space);var logdiv = document.getElementById(\'logdiv\');logdiv.parentNode.removeChild(logdiv);" style="width:100vw;height:100vh;z-index:5;position:fixed;background:rgba(0,0,0,0.5);left:0;top:0;"></div>'
  login_div.innerHTML = '<div data-aos="zoom-in" style="text-align:center;width:30vw;height:60vh;background:rgba(25,25,25,1);z-index:5;position:fixed;left:35vw;top:15vh;"><h1>Görünüşe Göre Oturum Açmamışsınız</h1><h2>Eğer adının ve fotoğrafının gözükmesini istiyorsan oturum açman gerek</h2><br /><button style="width:45%;height:10%;" id="yorum_kayit" class="auth_button">Kayıt Ol</button><br /><button style="width:45%;height:10%;" id="yorum_giris" class="auth_button">Giriş Yap</button></div>'
  
  document.body.appendChild(space);
  document.body.appendChild(login_div);
 
document.getElementById('yorum_giris').addEventListener('click', () => {
  space.parentNode.removeChild(space);
  login_div.parentNode.removeChild(login_div);
  login();
});

document.getElementById('yorum_kayit').addEventListener('click', () => {
  space.parentNode.removeChild(space);
  login_div.parentNode.removeChild(login_div);
  signup();
});

  }
  
}


const BlogPost = ( { post }) => (

  <div className="container">
    <Head>
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>


      <link rel="icon" href="/favicon.ico" />
      <link rel='stylesheet' href='/blog-style.css'></link>
           <link rel="stylesheet" href="/style.css"></link>
     <link rel="stylesheet" href="/all.css"></link>
     <script src="/all.js"></script>
    </Head>
    <div id="navbar" style={{left: 0 }} class="navbar_fixed"><img data-aos="zoom-in" onClick= {() => {location.href = '/'}} src="/Logo.png" style= {{ position: 'fixed:', zIndex:'10', cursor: 'pointer' ,marginLeft: '0.2%',width:'19.7vw', height: '100%', float: 'left', marginTop: '0.1vw'}}></img><button style={{marginLeft: '61vw'}} className='auth_button' onClick={() => {signup()}}>Kayıt Ol</button><button className='auth_button' onClick={() => {login()}}>Giriş Yap</button></div>
    <div id="blog-pattern">


    </div>

    <br />
    <div data-aos="zoom-in">
    <span id="like_number" style={{marginLeft: '10%', float: 'left', fontSize: '220%', paddingTop:'0.5%'}}>0</span>
    <p id="like_pls" style={{ width:'40%'}}>
      <i onClick = {() => {like()}} style={{cursor: 'pointer',width:'4.5vw',height:'4.5vh',marginBottom:'5vh',float:'left'}} className="fas fa-thumbs-up"></i>
      <p style={{textDecoration: 'underline',fontSize:'130%',marginLeft:'5%',marginTop:'3.3%',cursor: 'pointer', paddingTop: '2.5%'}} onClick = {() => {like()}}>Bu Yazıyı Beğen</p>
    </p>
    <div style={{ marginTop: '0vh' }} className="your_comment">
        <textarea id="textarea" style={{ marginLeft:'5vw' ,marginBottom: '0vh', border: 'none' ,width:'85%', resize: "none", height: 'unset', color: 'white', background: 'rgb(30,30,30)', fontSize: '120%', paddingTop: '0.5vw', paddingBottom: '1vw' }}></textarea><br />
    <button style={{marginBottom: '1vh'}} onClick={() => {makecommit(user.username,user.image,'19 Aralık 2020',document.getElementById("textarea").value)}} className="commit_button">Yorum Yap</button>
        </div>
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
