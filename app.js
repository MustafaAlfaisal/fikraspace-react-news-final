
// import necesary libs.
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'


let SearchBox = styled.input `
  border-radius: 20px;
  background-color: #000;
  color: #fff;
  font-size: 1.2rem;
  border: 0px;
  height: 40px;
`
let Navigation = styled.header `
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
`

let NewsContainer = styled.main`
  background-color: red;
  padding: 20px 10%;

`

let NewsItem = styled.div`
  background-color: #fff;
  border: 2px solid #E5E9F2;
  min-height: 150px;
  margin: 20px 0px;
  border-radius: 4px;
  display: flex;
  padding: 10px;
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
`

let DateTime = styled.time`
  position: absolute;
  bottom: 0px;
  color: #399DF2;
  font-family: sans-serif;
`

class News extends Component{
  
  constructor(){
    super()
  
    this.state = {
      news: []
    }

    fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=978d6c3818ff431b8c210ae86550fb1f')
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      this.setState({
        news: data.articles
      })
    })
  }


  render() {
    return (
      <React.Fragment>
        <Navigation>
          <img width="150px;" src={require('./assets/logo.svg')}/>
          <SearchBox placeholder="search term"/>
        </Navigation>
        <NewsContainer>
          {
            this.state.news.map((item, i)=>{
              return (
              <NewsItem>
                  <img width="124px;" height="124px" src={item.urlToImage} />
                <NewsText>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <DateTime>{item.publishedAt}</DateTime>
                </NewsText>
              </NewsItem>
              )
            })
          }
        </NewsContainer>
      </React.Fragment>
    )
  }
}

function App() {
  return <div>
    <News/>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))

