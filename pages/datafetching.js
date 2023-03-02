import React, { useState, useEffect } from 'react'
import axios from 'axios'

function datafetching() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/faq.txt')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  })
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>

  )
}
export default datafetching

