import React from 'react';
import { useRouter } from 'next/dist/client/router';

import Restaurant from '../components/Restaurant';

const Post: any = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(router, 'routes');
  console.log(id, 'id');

  return <Restaurant id={id} />;
};

export default Post;

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// };
