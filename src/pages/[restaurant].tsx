import React from 'react';
import { useRouter } from 'next/dist/client/router';

import RestaurantProfile from '../components/restaurant/RestaurantProfile';

const Post: any = () => {
  const router = useRouter();
  const id: string = router.query['restaurant'] as string;

  // TODO: Return error page for non-existing ID
  // TODO: Make a <Header> component
  return (
    <>
      <header className="header-container">
        <div className="logo-container">
          <a href="/">
            <h2>
              <span className="logo-red">foodie</span>
              <span className="logo-black">.io </span>
            </h2>
          </a>

        </div>
        <span className="sign-in">
          {/* <FontAwesomeIcon icon={['fas', 'user-circle']} /> */}
        </span>
      </header>
      <RestaurantProfile id={id} />;
    </>
  );
};

export default Post;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
