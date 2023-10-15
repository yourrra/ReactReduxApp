import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getContributes, getCurrentRepo } from '../../components/actions/repos'
import { useSelector } from 'react-redux'

import './Card.less'

const Card = props => {
  const [repo, setRepo] = useState({ owner: {} })
  const [contributors, setContributors] = useState([])
  const { username, reponame } = useParams()
  const isFetching = useSelector(state => state.repos.isFetching)

  const navigate = useNavigate()

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo)
    getContributes(username, reponame, setContributors)
  }, [])

  return (
    <div>
      <button onClick={() => navigate(-1)} className="button_back">
        Back
      </button>
      {isFetching === false ? (
        <div>
          <div className="card">
            <img src={repo.owner.avatar_url} alt="" />
            <div className="name">{repo.name}</div>
            <div className="stars">{repo.stargazers_count}</div>
          </div>
          {contributors.map((c, index) => (
            <div>
              {index + 1}. {c.login}
            </div>
          ))}
        </div>
      ) : (
        <div className="fetching"></div>
      )}
    </div>
  )
}

export default Card
