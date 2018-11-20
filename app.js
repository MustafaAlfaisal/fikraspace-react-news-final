
// import necesary libs.
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import style from './style.css'


let SearchBox = styled.input`
  border-radius: 20px;
  background-color: #F5F6FA;
  color: #fff;
  font-size: 1.2rem;
  border: 0px ;
  height: 40px;
  outline: none;
  padding: 0 10px;
`
let Navigation = styled.header`
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
`

let NewsContainer = styled.main`
  background-color: #F5F6FA;
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
  justify-content: space-between;
`

let NewsImg = styled.img`
  object-fit: cover;
  max-width: 165px;
  max-height: 165px;
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
  flex-grow: 2;
`

let DateTime = styled.time`
  position: absolute;
  bottom: 0px;
  color: #399DF2;
  font-family: sans-serif;
`

let VoterContainer = styled.div`
  width: 16px;
  height: 60px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-right: 40px
`

let VoterBtn = styled.img`
  width: 16px;
  height: 12px;
  padding: 10px;
`


class News extends Component {

  constructor() {
    super()

    this.state = {
      news: [],
      searchValue: ''
    }

    this.getNews()

  }

  getNews(searchTerm = 'Iraq') {
    fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          news: data.articles
        })
      })
  }

  onInputChange(event) {
    this.setState({
      searchValue: event.target.value
    })
  }

  onKeyUp(event) {
    if (event.key == 'Enter') {
      this.getNews(this.state.searchValue)
      this.setState({
        searchValue: ''
      })
    }
  }


  Counter() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navigation>
          <NewsImg width="150px;" src={require('./assets/logo.svg')} />
          <SearchBox
            onChange={this.onInputChange.bind(this)}
            onKeyUp={this.onKeyUp.bind(this)}
            value={this.state.searchValue} placeholder="search a topic" />
        </Navigation>
        <NewsContainer>
          {
            this.state.news.map((item, i) => {
              return (
                <NewsItem key={i}>
                  <img width="124px;" height="124px" src={item.urlToImage} />
                  <NewsText>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <DateTime>{item.publishedAt}</DateTime>
                  </NewsText>
                  <VoterContainer>
                    <VoterBtn src={require('./assets/voteUp.png')} />
                    <span>0</span>
                    <VoterBtn src={require('./assets/voteDown.png')} />
                  </VoterContainer>
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
    <News />
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))






var Counter = React.createClass({
  incrementCount: function () {
    this.setState({
      count: this.state.count + 1
    });
  },
  decrementCount: function () {
    this.setState({
      count: this.state.count - 1
    });
  },
  getInitialState: function () {
    return {
      count: 0
    };
  },
  render: function () {
    return (
      <div className="counter">
        <h1>{this.state.count}</h1>
        <button className="btn" onClick={this.incrementCount}>
          Increment
        </button>
        <button className="btn" onClick={this.decrementCount}>
          Decrement
        </button>
      </div>
    );
  }
});

React.render(<Counter />, document.body);


