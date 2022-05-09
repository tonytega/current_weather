import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


var testTweet = {
  message: "Something about cats.",
  gravatar: "xyz",
  author: {
  handle: "catperson",
  name: "IAMA Cat Person"
  },
  likes: 2,
  retweets: 0,
  timestamp: "2016-07-30 21:24:37"
  };

function Avatar({hash}){
  var url = `https://www.gravatar.com/avatar/${hash}`
  return(
    <img
      src= {url}
      className="avatar"
      alt="avatar" />
  )
}

function Message({text}){
  return(
    <div className='message'>
      {text}
    </div>
  )
}

function NameWithHandle({author}){
  const {name ,handle} = author
  return(
    <div className='name-with-handle'>
      <span className='name'>{name}</span>
      <span className='handle'>@{handle}</span>
    </div>
  )
}

const Time = ({time})=>{
  <span className="time">{time}</span>
};

  function getRetweetCount(count){
    if(count > 0){
      return(
        <span className='retweet-count'>{count}</span>
      )
    }else{
      return null;
    }
  }

const ReplyButton = ()=>{
  <i className="fa fa-reply reply-button"/>
};

const RetweetButton = ({count})=>{
  <span className='retweer-button'>
    <i className="fa-solid fa-retweet"/>
   { getRetweetCount({count})}
  </span>
};

const LikeButton = ({count})=>{
  <span className='likebutton'>
    <i className='fa fa-heart like-button'/>
    {count > 0 && <span className='like-count'> {count}</span>}
  </span>
};

const MoreOptionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button"/>
  );

  function Tweet(){
    return (
      <div className="tweet">
        <Avatar hash={testTweet.gravatar}/>
        <div className="content">
          <NameWithHandle author={testTweet.author}/><Time time = {testTweet.timestamp}/>
          <Message text={testTweet.message}/>
          <div className="buttons">
            <ReplyButton/>
            <RetweetButton count={testTweet.retweets}/>
            <LikeButton count={testTweet.likes}/>
            <MoreOptionsButton/>
          </div>
        </div>
      </div>
    );
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Tweet/>
    
  </div>
);


