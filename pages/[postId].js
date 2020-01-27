 
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
  //AOS.init();

  
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

 db.collection('posts').get().then(snapshot => {
  
  setupGuides(snapshot.docs);
});
}
}

const setupGuides = (data) => {
var tf = false;

  data.forEach((doc, index) => {
    const guide = doc.data();

console.log();

    if('http://localhost:3000/' + guide.slug == location.href){
    tf=true;

      document.title = guide.title;

      document.getElementsByClassName('container')[0].innerHTML = '<div class="blog">'+
      '<h2 class="blog-title">'+
      '<a class="title">'+guide.title+'</a>'+
      '</h2>'+
      '<div class="blog-text">'+
      '<img class="blog-image" src="'+guide.image+'"></img>'+
      '<p class="text">'+guide.details+'</p>'+
      '<div class="date">'+guide.date+'</div>'+
      '</div>'+
      '</div>';

    }
  });
  if(tf== false){
    location.href="/"
  }
}


const BlogPost = ( { post }) => (

  <div className="container">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel='stylesheet' href='/blog-style.css'></link>
    </Head>

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
  return { post: json.post, id: query.postId };
};

export default BlogPost;
