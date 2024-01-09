import './App.css'

import { lazy, Suspense } from 'react'

import SearchPage from './pages/Search.jsx'

import { Router } from './Router.jsx'
import Route from './Route.jsx'

const lazyAboutPage = lazy(() => import('./pages/About.jsx'))
const lazyHomePage = lazy(() => import('./pages/Home.jsx'))

const appRoutes = [
  {
    path: '/search/:query',
    component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes}>
          <Route path='/' component={lazyHomePage} />
          <Route path='/about' component={lazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
