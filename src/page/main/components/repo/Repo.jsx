import React from 'react'
import './Repo.less'
import { Link } from 'react-router-dom'

const Repo = props => {
  const repo = props.repo
  const dataUp = repo.updated_at

  const formatDate = dataUp => {
    const date = new Date(dataUp)
    const year = date.getFullYear()
    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.getDate()
    const time = date.toLocaleTimeString()

    return `${day} ${month} , ${year} - ${time}`
  }

  const formattedDate = formatDate(dataUp)

  return (
    <div className="repo">
      <div className="repo_header">
        <div className="repo_header__name">
          <Link to={`/card/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
        </div>
        <div className="repo_header__stars">
          Number of stars: {repo.stargazers_count}
        </div>
      </div>
      <div className="repo_last__commit">Last commit: {formattedDate}</div>
      <a href={repo.html_url} className="repo_link">
        follow the link to the repository
      </a>
    </div>
  )
}

export default Repo
