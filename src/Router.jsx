import { EVENT } from './const.js'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, seCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      seCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENT.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENT.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENT.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENT.POPSTATE, onLocationChange)
    }
  }, [])
  let routeParams = {}

  const routeFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routeFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // hemos usado path to regexp
    // para poder usar rutas dinamica '/:search'
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    routeParams = matched.params
    return true
  })?.component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent />
}
