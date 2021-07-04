import React from 'react';
import { useRouter } from 'next/dist/client/router';

import Restaurant from '../components/Restaurant';

type ID = {
  id: string | undefined;
};

const Post: any = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(router, 'routes');
  console.log(id, 'id');

  if (typeof id === 'string') {
    return <Restaurant id={id} />;
  }

  return <Restaurant id="idk" />;
};

export default Post;

// export async function getStaticPaths() {
//   // Return a list of possible value for id
// };
