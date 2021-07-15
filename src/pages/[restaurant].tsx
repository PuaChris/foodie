import React from 'react';
import { useRouter } from 'next/dist/client/router';

import RestaurantProfile from '../components/restaurant/RestaurantProfile';

type ID = {
  id: string | undefined;
};

const Post: any = () => {
  const router = useRouter();
  const { id } = router.query;

  return <RestaurantProfile />;
};

export default Post;
