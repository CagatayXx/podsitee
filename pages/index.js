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

const setupGuides = (data) => {
  data.forEach(doc => {
    const guide = doc.data();
    console.log(guide);
  });
}

//db.settings({ timestampsInSnapshots: true });
 console.log('');
}




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
    console.log(moverlay.style.margin);
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

const funktin = () => {
  document.getElementById('imaj').style.left = '50vw';
  console.log(document.getElementById('imaj').left='500px');
}

const Home = ({ posts }) => (
  <div className="container">
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/style.css"></link>
      <link rel="stylesheet" href="/all.css"></link>
      <script src="/all.js"></script>

      <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script src='/script.js'></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
 <script src="https://guzee.glitch.me/p5.speech.js"></script>
 <script src="https://guzee.glitch.me/sketch.js"></script>  
    </Head>

  <div>

    <div style= {{ marginLeft: '18vw', width: '32vw', height: '59vh', border: '1px solid rgb(25,25,25)'}}>
    <img style= {{ width: '100%', marginBottom: '-30%', height:'100%'}} src='/cerceve.gif'></img>  
    <img style= {{ marginLeft: '7.7%', width: '85%', marginTop: '-100%', height: '15vh'}} src="/gif.gif"></img>
    </div>
    
  </div>

<div style={{ float: 'left', paddingLeft: '2vw', width: '1px', height:'1px', marginBottom: '0vh' }}></div>

{[posts[0],posts[1],posts[2]].map((post,index) => (
  
<div className="miniblog" onMouseOver= {() => {deneme(index, 'over', 'mini')}} onMouseOut= {() => {deneme(index, 'out', 'mini')}}>


<div style={{ marginLeft: "0vw",width:"18vw",height:"44vh",overflow: "hidden",textAlign: "center", float: "left",marginRight: "5vw" }}>
    <img className="mini-image" style={{ borderRadius: "5px",width:"100%",height:"45%" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6RCB17kHh1r9Rcyd8p7cC2GiRL-PL41EpNjqMd9tvde7eLviz"></img>
    <div className="text"><p className="title" style={{ paddingTop: "0.5vh",fontWeight: "bold",fontSize: "200%",textAlign:"center",margin:0,marginBottom: "-1.5vh" }}>{post.title}</p>
    <p style={{ fontSize: "120%" }}>{ post.details }</p>
</div>

</div>

<div className="mini-overlay"><span onClick={() => { voiceEvent('play', index) }}><i  style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-play"></i></span> <span onClick={() => { voiceEvent('pause', index) }}><i style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-pause"></i></span> <Link href={post.slug}><span><i style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-eye"></i></span></Link></div>

</div>

))}


<div style= {{ marginBottom: "58vh", width: '0.5vw', height:'0.5vh' }}></div>

    {posts.map((post, index) => (
//      <div className="mini-overlay"><button style= {{ marginLeft: '-1vw' ,border: 'none',background: 'rgba(0,0,0,0)', color: 'rgba(250,250,250,1)', width:'3vw'}} onMouseOver={() => { voiceEvent('play', index) }}><i onMouseOver={() => { voiceEvent('play', index) }} style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-play"></i></button> <button style= {{border: 'none',background: 'rgba(0,0,0,0)', color: 'rgba(250,250,250,1)', width:'3vw'}} onMouseOver={() => { voiceEvent('play', index) }}><i onMouseOver={() => { voiceEvent('play', index) }} style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-pause"></i></button> <button style= {{border: 'none',background: 'rgba(0,0,0,0)', color: 'rgba(250,250,250,1)', width:'3vw'}} onMouseOver={() => { voiceEvent('play', index) }}><i onMouseOver={() => { voiceEvent('play', index) }} style={{ cursor: "pointer", marginRight: "0.5vw", marginLeft: "-0.3vw", fontSize: "250%" }} className="fas fa-download"></i></button></div>

/*      <div className="blog">
        <h2 className="blog-title">
          <Link href={post.slug}>
            <a className="blog-title-link">{post.title}</a>
          </Link>
        </h2>
        <div className="blog-text">
          <ReactMarkdown source={post.details} />
        </div>
        <div className="blog-date">{post.date}</div>
      </div>
*/

<div data-aos='fade-in'  className="blog" onMouseOver= {() => {deneme(index, 'over', 'norm')}} onMouseOut= {() => {deneme(index, 'out', 'norm')}}>
<img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6RCB17kHh1r9Rcyd8p7cC2GiRL-PL41EpNjqMd9tvde7eLviz" style={{width:"18vw",height: "18vh",float: "left",marginRight: "1.5vw",borderRadius: "5px"}}></img>
<div className="text" style={{width: "70vw",height:"15vh"}}>
    <p className="title" style={{paddingTop: "0.5vh",fontWeight: "bold",fontSize: "200%",textAlign:"center",margin:0}}>{ post.title }</p>
    <p className="intext"> { post.details } </p>
    <p className="date">{ post.date }</p>
</div>
<div className="overlay"><span onClick={() => { voiceEvent('play', index) }}><i  style={{cursor: 'pointer', width: '2.2vw',marginLeft: '-0.6vw', marginRight: '0.5vw' }} className='fas fa-play'></i></span> <span onClick={() => { voiceEvent('pause', index) }}><i style={{cursor: 'pointer', width: '2.2vw', marginRight: '0.5vw' }} className='fas fa-pause'></i></span><Link href={post.slug}><span><i style={{cursor: 'pointer', width: '2.5vw', marginLeft: '18vw' }} className='fas fa-eye'></i></span></Link> </div>

<audio style= {{ visibility: 'hidden' }} className="audi" controls>
        <source src= { post.audio } type="audio/ogg"></source>
      Your browser does not support the audio element.
      </audio>
</div>
    ))}

    <style jsx>{`
.blog svg {
  height: 3vw;
}

.miniblog svg {
  height: 2.5vw;
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
