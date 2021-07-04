import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles/SearchBar.module.scss';

const style: any = styles;

const SearchBar: React.FC = (): JSX.Element => (
  <div className={style['container']}>
    <label htmlFor="input">
      <span className={style['visually-hidden']}>Search blog posts</span>
    </label>
    <input
      type="text"
      name="input"
      className={style['search-input']}
      placeholder="Search restaurants"

    />
    <span className={style['search-icon']}>
      <FontAwesomeIcon icon={['fas', 'search']} />
    </span>
    <span className={style['search-filter']}>
      <FontAwesomeIcon icon={['fas', 'sliders-h']} />
    </span>
  </div>
);

export default SearchBar;
