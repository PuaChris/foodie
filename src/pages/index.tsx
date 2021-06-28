import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

library.add(fab, fas);

const index = () => <Link href="/restaurants">Restaurant</Link>;
export default index;
