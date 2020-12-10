import { CssBaseline } from '@material-ui/core'
import React, { useLayoutEffect, useState } from 'react'
import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Apps } from './Apps/'
import { Contact } from './Contact/'
import { Footer } from './Footer'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { Resume } from './Resume/'
import { TopNav } from './TopNav'
import { getContent } from './fetchers'

export const App: React.FC = (): JSX.Element => {
  const location = useLocation()
  const showNav = /(resume|apps|contact)\/?$/i.test(location.pathname)
  const [viewWidth, udpateViewWidth] = useState<number>(window.innerWidth)
  const [siteContent, updateSiteContent] = useState({})

  const resizeHandler = () => {
    udpateViewWidth(window.innerWidth)
  }

  if (!process.env.IS_SERVER) {
    useLayoutEffect(() => {
      window.addEventListener('resize', resizeHandler)
      return () => window.removeEventListener('resize', resizeHandler)
    })
  }

  useEffect(() => {
    getContent(window.location.pathname)
      .then(pageContent => {
        updateSiteContent({
          ...siteContent,
          [pageContent.path]: pageContent.content
        })
      })
      .catch(error =>
        console.error('%c getContent', 'color: red; font-size: large', error)
      )
  }, [location])

  return (
    <CssBaseline>
      {showNav && <TopNav viewWidth={viewWidth} />}
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Home content={siteContent['/']} />}
        />
        <Route path="/resume" exact component={Resume} />
        <Route path="/apps" exact component={Apps} />
        <Route
          path="/contact"
          exact
          render={() => <Contact content={siteContent['/contact']} />}
        />
        <Route
          path="/*"
          render={() => <NotFound content={siteContent['/error']} />}
        />
      </Switch>
      <Footer />
    </CssBaseline>
  )
}
