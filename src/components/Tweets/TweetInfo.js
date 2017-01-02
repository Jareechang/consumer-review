import React from 'react'

const TweetInfo = ({ text, created_at, entities, styles }) => (
  <div>
    <p> text: {text} </p>
    <p> created at: {created_at} </p>
    <p style={{ fontWeight: 'bold' }}> Mentions: </p>
    {
      entities.user_mentions.map(user => {
        return <div key={user.id} style={{ padding: '10px' }}>
          {user.name}
        (<span className={styles.screenName}>@{user.screen_name}</span>)
        </div>
      })
    }
    </div>
)

export default TweetInfo
