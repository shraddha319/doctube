import './Filter.scss';
import { capitalizeString } from '../../../utility';
import { useState } from 'react';

export default function Filter({ filter, dispatchFilter }) {
  const filterData = {
    filters: [
      {
        name: 'genre',
        type: 'CHECKBOX',
        fa_icon: 'fas fa-folder-open',
        options: [
          'drama',
          'history',
          'crime',
          'global',
          'sci-fi',
          'sport',
          'biography',
          'music',
          'food',
          'nature',
        ],
      },
      {
        name: 'year',
        type: 'CHECKBOX',
        fa_icon: 'far fa-calendar-alt',
        options: [
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018,
          2019,
          2020,
          2021,
          2022,
        ],
      },
      {
        name: 'language',
        type: 'CHECKBOX',
        fa_icon: 'fas fa-language',
        options: ['english', 'hindi', 'kannada'],
      },
      {
        name: 'country',
        type: 'CHECKBOX',
        fa_icon: 'fas fa-globe-americas',
        options: [
          'United States',
          'United Kingdom',
          'India',
          'South Korea',
          'Japan',
          'China',
          'Australia',
          'Israel',
        ],
      },
      {
        name: 'sort',
        type: 'RADIO',
        fa_icon: 'fas fa-sort',
        options: ['DEFAULT', 'IMDB', 'RECENTLY RELEASED', 'NAME'],
      },
    ],
  };
  const [showOptions, setShowOptions] = useState({
    name: '',
    show: false,
  });

  function FilterBtn({ name, fa_icon }) {
    function displayFilterSelection() {
      let result;
      if (!Array.isArray(filter[name])) result = filter[name];
      else if (filter[name].length === 1) result = filter[name][0];
      else if (filter[name].length > 1)
        result = `${filter[name].length} selected`;

      return capitalizeString(result);
    }

    return (
      <button
        onClick={() =>
          setShowOptions(
            showOptions.name === name
              ? { ...setShowOptions, show: false }
              : { name: name, show: true }
          )
        }
        class="filter__btn btn btn--icon--left btn--gray btn--round btn--xs"
      >
        <span class="btn__icon fa--xs">
          <i class={fa_icon}></i>
        </span>
        <p class="btn__text">{capitalizeString(name)}</p>
        <p className="btn__selected">{displayFilterSelection()}</p>
      </button>
    );
  }

  function checkboxClickHandler(e) {
    let { name, value } = e.target;

    e.target.checked
      ? dispatchFilter({
          type: 'ADD_CHECKITEM_FILTER',
          payload: {
            filterName: name,
            value: value,
          },
        })
      : dispatchFilter({
          type: 'REMOVE_CHECKITEM_FILTER',
          payload: {
            filterName: name,
            value: value,
          },
        });
  }

  function Checkbox({ name, options }) {
    return (
      <>
        {options.map((option) => (
          <div className="filter__option">
            <input
              onChange={checkboxClickHandler}
              name={name}
              value={option}
              type="checkbox"
              checked={filter[name].includes(option.toString())}
            />
            <label>{capitalizeString(option)}</label>
          </div>
        ))}
      </>
    );
  }

  function radioClickHandler(e) {
    let { value } = e.target;
    dispatchFilter({ type: 'UPDATE_SORT_FILTER', payload: { sort: value } });
  }

  function Radio({ name, options }) {
    return (
      <>
        {options.map((option) => (
          <div className="filter__option">
            <input
              onChange={radioClickHandler}
              type="radio"
              name={name}
              id={option}
              value={option}
              checked={option === filter[name]}
            />
            <label htmlFor={option}>{capitalizeString(option)}</label>
          </div>
        ))}
      </>
    );
  }

  function FilterOptions({ name, type, options }) {
    return (
      <>
        {(() => {
          switch (type) {
            case 'CHECKBOX':
              return <Checkbox name={name} options={options} />;

            case 'RADIO':
              return <Radio name={name} options={options} />;

            default:
              return;
          }
        })()}
      </>
    );
  }

  return (
    <div className="filter flex--row">
      {filterData.filters.map(({ name, fa_icon, type, options }) => (
        <div className="filter__container">
          <FilterBtn name={name} fa_icon={fa_icon} />
          {showOptions.name === name && showOptions.show && (
            <div className="filter__options">
              <FilterOptions name={name} type={type} options={options} />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={(e) => dispatchFilter({ type: 'RESET_FILTERS' })}
        class="btn btn--icon--left btn--secondary btn--round btn--xs"
      >
        <span class="btn__icon fa--xs">
          <i class="fas fa-undo"></i>
        </span>
        <p class="btn__text">Clear Filter</p>
      </button>
    </div>
  );
}
