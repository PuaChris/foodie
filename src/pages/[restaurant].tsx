import React from 'react';
import { useRouter } from 'next/dist/client/router';

import RestaurantProfile from '../components/restaurant/RestaurantProfile';

const Post: any = () => {
  const router = useRouter();
  const id: string = router.query['restaurant'] as string;

  // TODO: Return error page for non-existing ID
  return <RestaurantProfile id={id} />;
};

export default Post;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
