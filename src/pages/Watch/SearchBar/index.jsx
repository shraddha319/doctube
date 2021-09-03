import './SearchBar.scss';

export default function SearchBar({ search, dispatchFilter }) {
  return (
    <div className="SearchBar">
      <div className="search__container">
        <div className="search__icon">
          <i className="fas fa-search"></i>
        </div>
        <input
          onChange={(e) =>
            dispatchFilter({
              type: 'SET_SEARCH',
              payload: { search: e.target.value },
            })
          }
          placeholder="Search"
          className="search__input"
          type="text"
          value={search}
          autoFocus
        />
      </div>
    </div>
  );
}
