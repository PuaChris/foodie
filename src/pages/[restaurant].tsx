import React from 'react';
import { useRouter } from 'next/dist/client/router';

import RestaurantProfile from '../components/restaurant/RestaurantProfile';
import { IRestaurant, EmotionType, RecommendType } from '../constant';

const Post: any = () => {
  const router = useRouter();

  let restData: IRestaurant = {
    id: '',
    name: 'New Restaurant',
  };

  if (router.query) {
    restData = {
      id: router.query.id as string,
      name: router.query.name as string,
      location: router.query.location as string,
      phone: router.query.phone as string,
      emotion: router.query.emotion as EmotionType,
      recommend: router.query.recommend as RecommendType,
    };
  }

  return <RestaurantProfile restData={restData} />;
};

export default Post;
