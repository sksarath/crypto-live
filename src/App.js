import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Card from "./component/card/card";
import Market from "./component/market/market";
import Footer from "./component/footer/footer";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      card: [],
      loading: true,
      price: null,
      lastprice: null,
      difference: null,
      global:{},
      currency: {},
      defaultCurrency: 'USD'
    };
    this.fetchAll = this.fetchAll.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.currencyChange =  this.currencyChange.bind(this);
  }
  componentDidMount() {
    if(!navigator.onLine){
      this.setState({
        card: JSON.parse(localStorage.getItem('card')),
        loading: JSON.parse(localStorage.getItem('loading')),
        global: JSON.parse(localStorage.getItem('global')),
      });
    }
    this.fetchAll();
    this.interval = setInterval(() => {
      this.fetchAll();
    }, 60 * 1000);
  }
  fetchAll() {
    var fetchcoin = this.fetchData('https://api.coinmarketcap.com/v2/ticker/?limit=20');
      fetchcoin.then(json => {
        console.log('josn fetch coin', json);
        let recvData = json && json.data;
        let toArray = Object.keys(recvData).map((item,index) => {
          return json.data[item];
        });
        let sortArray = toArray.sort((a,b) => {
          return a.rank - b.rank
        });
        this.setState({
          card: sortArray,
        });
        localStorage.setItem('card', JSON.stringify(sortArray));
      }).then(() =>{
        this.setState({
          loading: false
        });
        localStorage.setItem('loading',false);
      }).catch(error =>{
        console.error('Network issue');
      });
      var fetchgobal = this.fetchData('https://api.coinmarketcap.com/v2/global/');
      fetchgobal.then(data => {
        this.setState({
          global: data.data
        })
        localStorage.setItem('global', JSON.stringify(data.data));
      }).catch(error => {
        console.error('Network issue');
      });
  }

  fetchData (url){
    return axios.get(url)
      .then(response => response.data)
      .then(data => data)
      .catch((error)=>{
        console.log('url error', error);
      });
  }
  currencyChange (event){
    this.setState({
      defaultCurrency: event.target.value
    });
    if(event.target.value!=='USD')
    {
      var selectedCurrency = event.target.value;
      var url = `https://exchangeratesapi.io/api/latest?base=USD&symbols=${selectedCurrency}`;
      var fetchCurrencyRate = this.fetchData(url);
      fetchCurrencyRate
        .then(data => {
          var currency_obj = {
            curr_name: selectedCurrency,
            curr_value: data.rates[selectedCurrency]
          };
          console.log('currency', currency_obj);
          this.setState({currency: currency_obj})
        });
    }
    else
    {
      this.setState({currency: {}})
    }
  }
  render() {
    let itemlist = this.state.card;
    let total_market_cap = this.state.global.quotes && this.state.global.quotes.USD.total_market_cap;
    let formated_total_market_cap = total_market_cap && total_market_cap.toLocaleString();
    console.log('total_market_cap', total_market_cap);
    return (
      <div className="App">
        <header className="App-header">
          <div className="max-width header-width">
            <h1 className="App-title">Crypto live</h1>
            <div className="info-label">
              <span>
                Cryptocurrencies : {this.state.global.active_cryptocurrencies}
              </span>
              <span>
                Markets : {this.state.global.active_markets}
              </span>
              <span>
                Market Cap : ${formated_total_market_cap}
              </span>
            </div>
            <div className="floating-img">
              <img src={require("./img/crypto/BTC.png")} className="indiv-img" alt="BTC"/>
              <img src={require("./img/crypto/LTC.png")} className="indiv-img" alt="LTC"/>
              <img src={require("./img/crypto/XRP.png")} className="indiv-img" alt="XRP"/>
              <img src={require("./img/crypto/DASH.png")} className="indiv-img" alt="DASH"/>
              <img src={require("./img/crypto/XMR.png")} className="indiv-img" alt="XMR"/>
            </div>
            <div className="select-pos">
              <div className="pos-relative">
                <label htmlFor="currency" className="curr-label">Currency :</label>
                <select className="select-style" value={this.state.defaultCurrency} id="currency" onChange={this.currencyChange}>
                  <option value="USD">&#36; USD</option>
                  <option value="INR">&#8377; INR</option>
                  <option value="EUR">&#8364; EUR</option>
                </select>
                <div className="down-triangle"></div>
              </div>
            </div>
          </div>
        </header>
        <div className={this.state.loading===true?'loading':'loaded'}>
          <center>
            <h3>Loading...</h3>
          </center>
        </div>
        <div className={this.state.loading!==true?'loading':'loaded'}>
          <div className="max-width">
            <Market />
          </div>
          <div className="wrapper">
            <div className="max-width">
                <div className="card-container">
                  {
                    itemlist.map((item, index) => {
                      return <Card data={item} key={index} currency={this.state.currency}/>
                    })
                  }
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
