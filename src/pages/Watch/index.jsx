import './Watch.scss';
import { VideoList, Loader } from '../../components';
import {
  getFilteredAndSearchedList,
  stringifyFilterObj,
  parseURLParamStr,
} from '../../utility';
import { useEffect, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { useVideos } from '../../contexts';

//FIXME: filter on url - needs fixing

export default function Watch() {
  const {
    videos: { videos, status },
    dispatchVideos,
    fetchVideos,
  } = useVideos();

  const initFilter = {
    genre: [],
    year: [],
    language: [],
    country: [],
    sort: 'DEFAULT',
    search: '',
  };
  const [filter, dispatchFilter] = useReducer(filterReducer, initFilter);

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    let urlParamStr = stringifyFilterObj({ ...filter });
    navigate({
      search: `?${urlParamStr}`,
      replace: true,
    });
  }, [filter]);

  useEffect(() => {
    if (status === 'idle') fetchVideos(dispatchVideos);

    let UrlParamObj = search ? parseURLParamStr(search) : null;
    dispatchFilter({
      type: 'INITIALISE_FILTER',
      payload: { filter: UrlParamObj },
    });
  }, []);

  function filterReducer(state, { type, payload }) {
    switch (type) {
      case 'ADD_CHECKITEM_FILTER':
        return {
          ...state,
          [payload.filterName]: [...state[payload.filterName], payload.value],
        };

      case 'REMOVE_CHECKITEM_FILTER':
        return {
          ...state,
          [payload.filterName]: state[payload.filterName].filter(
            (elem) => elem !== payload.value
          ),
        };

      case 'UPDATE_SORT_FILTER':
        return {
          ...state,
          sort: payload.sort,
        };

      case 'RESET_FILTERS':
        return { ...initFilter };

      case 'INITIALISE_FILTER':
        return { ...state, ...payload.filter };

      case 'SET_SEARCH':
        return { ...state, search: payload.search };

      default:
        return state;
    }
  }

  return (
    <div className="Watch layout--default">
      {status === 'idle' || status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <SearchBar search={filter.search} dispatchFilter={dispatchFilter} />
          <div className="watch__filter">
            <Filter filter={filter} dispatchFilter={dispatchFilter} />
          </div>
          <div className="watch__videos flex--row">
            <VideoList videos={getFilteredAndSearchedList(videos, filter)} />
          </div>
        </>
      )}
    </div>
  );
}
