import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";


const BlogPost = ( { post }) => (
  <div className="container">
    <Head>
      <title>{post.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel='stylesheet' href='/blog-style.css'></link>
    </Head>

    <div className="blog">
      <h2 className="blog-title">
        <Link href= {post.slug}>
          <a className="title">{post.title}</a>
        </Link>
      </h2>
      <div className="blog-text">
      <img className='blog-image' src={post.image} ></img>
        <ReactMarkdown className='text' source={post.details} />
        <div className="date">{post.date}</div>
      </div>
    </div>
    <style jsx>{`
    `}</style>
  </div>
);

BlogPost.getInitialProps = async ({ req, query }) => {
  // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin
  const res = await fetch(`http://localhost:3000/api/post/${query.postId}`);
  const json = await res.json();
  if(json.post == undefined){
    return { post:  {
      title: 'Bilinmeyen Sayfa!',
      slug: '',
      details: '',
      date: '',
      audio: ''
    } }
  }
  return { post: json.post };
};

export default BlogPost;
