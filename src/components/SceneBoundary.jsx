import { Component } from 'react'

export default class SceneBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    // 3D hero is decorative — fall back silently rather than break the page.
    console.warn('Hero scene failed, using fallback background:', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
