import App, {Container} from 'next/app'
import React,{ PureComponent, Fragment } from 'react'
import './global.scss';
export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}