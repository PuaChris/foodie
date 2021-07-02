import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles/SearchBar.module.scss';

const style: any = styles;

const SearchBar: React.FC = (): JSX.Element => (
  <div className={style['search-bar_container']}>
    <label htmlFor="search-bar_form">
      <span className={style['visually-hidden']}>Search blog posts</span>
    </label>
    <input
      type="text"
      id="search-bar_input"
      className={style['search-bar_input']}
      placeholder="Search restaurants"

    />
    <span className={style['search-bar_search-icon']}>
      <FontAwesomeIcon icon={['fas', 'search']} />
    </span>
    <span className={style['search-bar_filter']}>
      <FontAwesomeIcon icon={['fas', 'sliders-h']} />
    </span>
  </div>
);

export default SearchBar;
