import React,{PureComponent} from 'react';
import Link from 'next/Link'
import Router from 'next/router'
import Head from './head'
// import './global.less';
export default class extends PureComponent {
  constructor(props){
      super(props)
  }
  state={

  }

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
    <>
      <Head />
      <Link  href="/#id1"><a>Disables scrolling</a></Link>
      <div>
        Hello World {this.props.userAgent}
      </div>
      <div style={{width:'100%',height:'300px'}}></div>
      <div style={{width:'100%',height:'300px'}}></div>
      <div id='id1' style={{width:'100%',height:'300px',background:'#000'}}></div>
      <div style={{width:'100%',height:'300px'}}></div>
      <div style={{width:'100%',height:'300px',background:'#000'}}></div>
      <div style={{width:'100%',height:'300px',background:'#000'}}></div>
    </>
    )
  }
}