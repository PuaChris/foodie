import React from 'react';
import { useRouter } from 'next/dist/client/router';

import RestaurantProfile from '../components/restaurant/RestaurantProfile';

const Post: any = () => {
  const router = useRouter();

  let id: string = '';

  if (router.query && router.query.id) {
    id = router.query.id as string;
  }

  console.log(`ID for restaurant: ${id || '<undefined ID>'}`);

  // TODO: Return error page for non-existing ID
  return <RestaurantProfile id={id} />;
};

export default Post;
