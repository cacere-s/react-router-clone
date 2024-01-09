import { EVENT } from './const.js'

export function navigation (href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENT.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handlerClick = (event) => {
    const isMainEvent = event.button === 0
    const isModifiedEvent = event.metaKey || event.ctrlKey || event.altKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigation(to)
    }
  }

  return (<a onClick={handlerClick} href={to} target={target} {...props} />)
}
