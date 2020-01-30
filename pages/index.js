import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

var Cookie = require('js-cookie');

var user;
/*
import AOS from "aos";
import "aos/dist/aos.css";*/
 
 
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');
 
 
var app;
var auth;
var db;


 /*
const voiceEvent = (ev,n) => {
 var audii = document.getElementsByTagName('audio')[n];
   if(ev == 'play'){
     audii.play();
   }
 
   else if(ev == 'pause'){
     audii.pause();
   }
}
 */
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
 
 
/* var tblog = document.getElementsByClassName('blog')[n];
console.log(tblog);
 
 var overlay = tblog.getElementsByClassName('overlay')[0];
 
 overlay.style = 'background:red'
 
    <div className="hero">
     <h1 className="hero-title">Selman Kahya</h1>
     <div className="hero-social-links">
       <Link href="https://medium.com/@selmankahya">
         <a className="social-link">Medium</a>
       </Link>
       <Link href="https://www.twitter.com/selmankahyax">
         <a className="social-link">Twitter</a>
       </Link>
       <Link href="https://www.linkedin.com/in/selmankahya">
         <a className="social-link">LinkedIn</a>
       </Link>
       <Link href="https://www.instagram.com/selmankahyax/?hl=en">
         <a className="social-link">Instagram</a>
       </Link>
     </div>
    
   </div>
 */
}
 
if (typeof window !== 'undefined') {
 AOS.init();
 
 
  var navbar_top=480;
 
 window.addEventListener("scroll",navbar_reset_top,false);
 
 function navbar_reset_top() {
   
   var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
   if(scrollTop>navbar_top&&navbar.className==="navbar_absolute") {
     document.getElementById("navbar").className="navbar_fixed";
     document.getElementById("navbar").style.background="rgb(28,28,28)";
     document.getElementById('spc').style = "width: 1vw;height: 16vh";
     if(document.getElementById('user-bg') != undefined){
      document.getElementById('user-bg').style.marginLeft = '63vw';
     }

     if(document.getElementsByClassName('user_image_div')[0] != undefined){
      document.getElementsByClassName('user_image_div')[0].style.marginTop = '-2vh';
      document.getElementById('username_p').style.paddingTop = '0vh';
      }
      else if( document.getElementsByClassName('b1')[0].style != undefined) {
        document.getElementsByClassName('b1')[0].style.marginLeft = '59vw'
      }


   }
   else if(scrollTop<navbar_top&&navbar.className==="navbar_fixed") {
     document.getElementById("navbar").className="navbar_absolute";
     document.getElementById("navbar").style.background="rgb(25,25,25)";
     document.getElementById('spc').style = "";

     if(document.getElementById('user-bg') != undefined){
      document.getElementById('user-bg').style.marginLeft = '67vw';
      }

     if(document.getElementsByClassName('user_image_div')[0] != undefined){
     document.getElementsByClassName('user_image_div')[0].style.marginTop = '1vh';
     document.getElementById('username_p').style.paddingTop = '2.5vh';
     }

     else if( document.getElementsByClassName('b1') != undefined) {
      document.getElementsByClassName('b1')[0].style.marginLeft = '61vw'
    }
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

//   db.collection("users").add()
   
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
           /* document.getElementById('user-bg').style.webkitTransition = '';
            document.getElementById('user-bg').style.transition = '';  */
            }, 1500);
            }, 10);
          }, 500);
          
        }
      })
    }

db.collection('posts').get().then(snapshot => {
 //console.log(snapshot.docs);
 setupGuides(snapshot.docs);
});
/*
db.collection('posts').get().then(snapshot => {
 //console.log(snapshot.docs);
 setupGuides2(snapshot.docs);
});
*/
//db.settings({ timestampsInSnapshots: true });
console.log('');
}
 
var fss = [];
 
const setupGuides = (data) => {
 data.forEach((doc, index) => {
   const guide = doc.data();
 
   console.log("Al dat: " +  guide);
 
   function a() {
     console.log("sa");
   }
 
   if(index < 3){
     console.log(index);
     document.getElementById('alan1').innerHTML += '<div data-aos="fade-up" class="miniblog">'+
     '<div style="margin-left: 0vw;width:18vw;height: 44vh;overflow: hidden;text-align: center; float: left;margin-right: 5vw">'+
         '<img class="mini-image" style="border-radius: 5px;width:100%;height:45%;" src="'+guide.image+'"></img>'+
         '<div class="text"><p class="title" style="padding-top: 0.5vh;font-weight: bold;font-size: 200%;text-align:center;margin:0;margin-bottom: -1.5vh">'+guide.title+'</p>'+
         '<p style="font-size: 120%">'+guide.details+'</p>'+
     '</div>'+
     '</div>'+
     '<div class="mini-overlay"><span onclick="document.getElementsByTagName(\'audio\')['+index+'].play();"><i  style="cursor: pointer; margin-right: 1vw; margin-left: -0.3vw; font-size: 250%;height: 2.5vw;" class="fas fa-play"></i></span><span onclick="document.getElementsByTagName(\'audio\')['+index+'].pause();"><i  style="cursor: pointer; margin-right: 1vw; margin-left: -0.3vw; font-size: 250%;height: 2.5vw;" class="fas fa-pause"></i></span><span onclick="location.href=\''+guide.slug+'\'"><i  style="height: 2.5vw;;cursor: pointer; margin-right: 0.5vw; margin-left: -0.3vw; font-size: 250%" class="fas fa-eye"></i></span></div>'+
     '</div>';
   }
 
   document.getElementById('alan2').innerHTML += '<div data-aos="zoom-in"  class="blog">'+
   '<img class="image" src="'+guide.image+'" style=\'width:18vw;height: 18vh;float: left;margin-right: 0.5vw;border-radius: 5px\'></img>'+
   '<div class="text" style=\'width: 70vw;height:15vh;\'>'+
       '<p class="title" style=\'padding-top: 0.5vh;font-weight: bold; font-size: 200%; margin:0vw\'>&nbsp;&nbsp;'+guide.title+'</p>'+
       '<p class="intext"> '+guide.details+' </p>'+
       '<p class="date">'+guide.date+'</p>'+
   '</div>'+
   '<div class="overlay"><span onclick="document.getElementsByTagName(\'audio\')['+index+'].play();"><i style="cursor: pointer; width: 2.2vw;margin-left: 0.3vw; margin-right: 0.2vw;" class="fas fa-play"></i></span><span onclick="document.getElementsByTagName(\'audio\')['+index+'].pause();"><i  style="cursor: pointer; width: 2.2vw;margin-left: 0.2vw; margin-right: 0.2vw;" class="fas fa-pause"></i></span><span onclick="location.href = \''+guide.slug+'\'"><i  style="cursor: pointer; width: 3vw;margin-left: 0.2vw; margin-right: 0.5vw;" class="fas fa-eye"></i></span></div>'+
   '<audio style= "visibility: hidden" class="audi" controls>'+
           '<source src= "'+guide.audio+'" type="audio/ogg"></source>'+
         'Your browser does not support the audio element.'+
         '</audio>'+
   '</div>';
 
   fss[fss.length] = () => {document.getElementsByClassName('blog')[index].addEventListener("mouseover", function(){
     deneme(index,'over','norm');
   });
}
  
fss[fss.length] = () => {document.getElementsByClassName('blog')[index].addEventListener("mouseout", function(){
 deneme(index,'out','norm');
});
}
 
if(index < 3){

  fss[fss.length] = () => {document.getElementsByClassName('miniblog')[index].addEventListener("mouseover", function(){
    deneme(index,'over','mini');
   });
   }
    
   fss[fss.length] = () => {document.getElementsByClassName('miniblog')[index].addEventListener("mouseout", function(){
   deneme(index,'out','mini');
   });
   }
   

}
 
 });
 
 console.log(fss);
 
 for(var i = 0;fss[i] != undefined;i++){
   fss[i]();
 }
 
 /*document.getElementsByClassName('blog').addEventListener('click', function() {
   console.log('sa');
 });*/
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
    /*  document.getElementById('user-bg').style.webkitTransition = '';
      document.getElementById('user-bg').style.transition = '';  */
      }, 1500);
      }, 10);
    }, 500);
    

    Cookie.set('username', username);
    Cookie.set('password', password);
  
    
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
 
 
const Home = ({ posts }) => (
 <div className="container">
   <Head>
     <title>Home</title>
     <link rel="icon" href="/favicon.ico" />
     <link rel="stylesheet" href="/style.css"></link>
     <link rel="stylesheet" href="/all.css"></link>
     <script src="/all.js"></script>
 
 
     <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
 
     <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
 <script>
 </script>
 
 
 
 <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script src="https://guzee.glitch.me/p5.speech.js"></script>
   </Head>
 
 <div>

<div className='tutacak'>

<div data-aos="fade-in" id="akcay" className="akcay">
 <div id="akcay_banner" style={{float: 'left'}} className="akcay-banner">
   <img src="/asistan.png" id="akcay_image" className="akcay-image"></img>
  </div>
  <p id="akcay_text" className="akcay-text"></p>
</div>
</div>
   
   <div data-aos='fade-in' style= {{ marginBottom: '-5vh', marginTop: '-5vh', marginLeft: '18vw', width: '32vw', height: '59vh', border: '1px solid rgb(25,25,25)'}}>
   <img style= {{ width: '100%', marginBottom: '-30%', height:'100%'}} src='/cerceve.gif'></img> 
   <img style= {{ marginLeft: '7.7%', width: '85%', marginTop: '-100%', height: '15vh'}} src="/gif.gif"></img>
   </div>
  
 </div>
 
 
<div style={{ float: 'left', paddingLeft: '2vw', width: '1px', height:'1px', marginBottom: '0vh' }}></div>
 
<div id="navbar" class="navbar_absolute" style= {{marginLeft:'-13.5vw'}}><img src="/Logo.png" style= {{ cursor: 'pointer' ,width:'19.7vw', height: '100%', float: 'left', marginTop: '0.1vw'}}></img><button style={{marginLeft: '61vw'}} className='auth_button b1' onClick={() => {signup()}}>Kayıt Ol</button><button className='auth_button' onClick={() => {login()}}>Giriş Yap</button></div>
<div id="spc"></div>
<div id='alan1'></div>
 
<div style= {{ marginBottom: "52vh", width: '0.5vw', height:'0.5vh' }}></div>
 
<div id="alan2"></div>
 
   <style jsx>{`
.blog svg {
 height: 3vw;
}
 
.miniblog svg {
 height: 2.5vw;play
}
 
     .container {
       width: 71.5vw;
       margin: 0 auto;
     }
 
     .hero {
       text-align: center;
       margin: 96px 0;
     }
 
     .social-link {
       margin-right: 8px;
     }
 
     .hero-title {
       font-size: 48px;
     }
 
     .blog-date {
       text-align: right;
       color: #cccccc;
       margin: 12px 0 48px 0;
     }
 
     a {
       color: #35459e;
       text-decoration: none;
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
