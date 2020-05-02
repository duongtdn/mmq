"use strict"

import React from 'react'

import { Navigator } from '@realmjs/react-navi'

import PageHome from './Page/PageHome'
import PagePlay from './Page/PagePlay'
import PageResult from './Page/PageResult'

const routes = {
  home: { Page: PageHome },
  play: { Page: PagePlay },
  result: { Page: PageResult },
};

export default function (props) {
  return (
    <Navigator
      routes = {routes}
      initialRoute = 'play'
      noUrl = {true}
      {...props}
    />
  );
}
