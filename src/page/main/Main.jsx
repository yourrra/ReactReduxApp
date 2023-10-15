import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRepos } from '../../components/actions/repos'
import Repo from './components/repo/Repo'
import { setCurrentPage } from '../../reducers/reposReducer'
import { createPages } from '../../utils/pagesCreator'

import './Main.less'

export const Main = () => {
  const dispatch = useDispatch()
  const repos = useSelector(state => state.repos.items)
  const isFetching = useSelector(state => state.repos.isFetching)
  const currentPage = useSelector(state => state.repos.currentPage)
  const perPage = useSelector(state => state.repos.perPage)
  const totalCount = useSelector(state => state.repos.totalCount)
  const [searchValue, setSearchValue] = useState('')
  const pagesCount = Math.ceil(totalCount / perPage)
  const pages = []

  createPages(pages, pagesCount, currentPage)

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage))
  }, [currentPage])

  function searchHandler() {
    dispatch(setCurrentPage(1))
    dispatch(getRepos(searchValue, currentPage, perPage))
  }

  const performSearch = event => {
    event.preventDefault()
  }

  return (
    <div>
      <div className="wrapperRepo">
        <div>
          <form onSubmit={performSearch} className="search">
            <input
              value={searchValue}
              onChange={event => setSearchValue(event.target.value)}
              type="text"
              placeholder="Input repo name"
              className="input"
            />
            <button
              onClick={() => searchHandler()}
              type="submit"
              className="button"
            >
              Search
            </button>
          </form>
        </div>
        {isFetching === false ? (
          repos.map(repo => <Repo repo={repo} />)
        ) : (
          <div className="fetching"></div>
        )}
      </div>

      <div className="pages">
        {pages.map((page, index) => (
          <span
            key={index}
            className={currentPage == page ? 'page_current' : 'page'}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Main
