import './Watch.scss';
import { VideoList, Loader } from '../../components';
import { useData } from '../../context';
import {
  getFilteredAndSearchedList,
  stringifyFilterObj,
  parseURLParamStr,
} from '../../utility/utils';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { getVideos } from '../../api';

export default function Watch() {
  const {
    data: { videos },
    dispatchData,
  } = useData();
  const initFilter = {
    genre: [],
    year: [],
    language: [],
    country: [],
    sort: 'DEFAULT',
    search: '',
  };
  const [filter, dispatchFilter] = useReducer(filterReducer, initFilter);
  const [loading, setLoading] = useState(false);

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
    let UrlParamObj = search ? parseURLParamStr(search) : null;

    dispatchFilter({
      type: 'INITIALISE_FILTER',
      payload: { filter: UrlParamObj },
    });

    (async () => {
      if (videos.length > 0) return;
      setLoading(true);
      try {
        const {
          data: {
            success,
            data: { videos },
          },
        } = await getVideos();

        if (success)
          dispatchData({ type: 'FETCH_VIDEOS', payload: { videos } });
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
        console.log(error);
      }
      setLoading(false);
    })();
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
      <SearchBar search={filter.search} dispatchFilter={dispatchFilter} />
      <div className="watch__filter">
        <Filter filter={filter} dispatchFilter={dispatchFilter} />
      </div>
      <div className="watch__videos flex--row">
        {loading ? (
          <Loader />
        ) : (
          <VideoList videos={getFilteredAndSearchedList(videos, filter)} />
        )}
      </div>
    </div>
  );
}
