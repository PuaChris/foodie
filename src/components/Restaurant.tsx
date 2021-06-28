import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles/restaurant.module.scss';
const style: any = styles;

// Declaring Prop interface
type IProps = {

};

// Declaring State interface
type IState = {
  comments: string[];
};

class Restaurant extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      comments: [],
    };
  }

  render() {
    return (
      <div className={style['']}>
        <h1>
          New Restaurant
        </h1>
      </div>
    );
  }
}

export default Restaurant;
