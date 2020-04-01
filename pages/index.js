import React,{PureComponent} from 'react';
import Link from 'next/Link'
import Router from 'next/router'
import Head from './head'
import WithDva from '../utils/store';

class Index extends PureComponent {
  constructor(props){
      super(props)
  }
  state={

  }

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  onPush=()=>{
    const {dispatch}=this.props;
    dispatch({
      type:'index/name',
      payload:'这是一个名字'
    })
  }

  render() {
    const { index:{name}}=this.props;
    return (
    <>
      <Head />
      <Link  href="/#id1"><a>Disables scrolling</a></Link>
      <div onClick={this.onPush}>
        Hello World {this.props.userAgent}
      </div>
      <div> {name}</div>
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

export default WithDva(({index}) => ({index}))(Index);