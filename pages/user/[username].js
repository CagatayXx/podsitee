 
import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

if (typeof window !== 'undefined') {
  //AOS.init()

  const setupGuides = (data) => {
    var tf = false;
    
      data.forEach((doc, index) => {
        const guide = doc.data();
    
    console.log();
    
        if('http://localhost:3000/user/' + guide.username == location.href){
        tf=true;
            document.body.innerHTML = guide.username;
        }
      });
      if(tf== false){
        location.href="/"
      }
    }
    

  
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

 db.collection('users').get().then(snapshot => {
  
  setupGuides(snapshot.docs);
});
}
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
    <div id="blog-pattern">

    </div>
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
