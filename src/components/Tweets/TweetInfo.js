import React from 'react'

const TweetInfo = ({ full_text: fullText, created_at, entities, styles }) => (
  <div className={styles.tweetInfo}>
    <p className={styles.tweetPara}>
      {fullText}
    </p>
    <p> created at: {created_at} </p>
    <p style={{ fontWeight: 'bold' }}> Mentions: </p>
    {
      entities.user_mentions.map(user => {
        return <div key={user.id} className={styles.userMentions}>
          {user.name}
          <span className={styles.screenName}>@{user.screen_name}</span>
        </div>
      })
    }
  </div>
)

export default TweetInfo
