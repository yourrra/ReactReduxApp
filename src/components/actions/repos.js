import axios from 'axios'
import {
  setFetchError,
  setIsFetching,
  setRepos,
} from '../../reducers/reposReducer'

export const getRepos = (searchQuery = 'stars:%3E1', currentPage, perPage) => {
  if (searchQuery == '') {
    searchQuery = 'stars:%3E1'
  }
  return async dispatch => {
    try {
      dispatch(setIsFetching(true))
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`,
      )
      console.log('getRepos')
      dispatch(setRepos(response.data))
    } catch (e) {
      dispatch(setFetchError(true))
      dispatch(setIsFetching(false))
    }
  }
}

export const getCurrentRepo = async (username, repoName, setRepo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}`,
  )
  console.log('getCurrentRepo')
  setRepo(response.data)
}

export const getContributes = async (username, repoName, setContributors) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=10`,
  )
  console.log('getContributes')
  setContributors(response.data)
}
