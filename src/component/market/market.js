import React from 'react';
import './market.css';

const Market = () => {
  let marketList = [
    {
      name: 'Binance',
      url: 'https://www.binance.com'
    },
    {
      name: 'Coinbase',
      url: 'https://www.coinbase.com'
    },
    {
      name: 'KuCoin',
      url: 'https://www.kucoin.com'
    },
    {
      name: 'CEX.IO',
      url: 'https://cex.io'
    },
    {
      name: 'Cryptopia',
      url: 'https://www.cryptopia.co.nz'
    },
    {
      name: 'Bitfinex',
      url: 'https://www.bitfinex.com'
    },
    {
      name: 'Bittrex',
      url: 'https://bittrex.com'
    },
    {
      name: 'QUOINEX',
      url: 'https://quoinex.com'
    },
    {
      name: 'CoinEx',
      url: 'https://www.coinex.com'
    },
    {
      name: 'Bitstamp',
      url: 'https://www.bitstamp.net'
    },
    {
      name: 'Kraken',
      url: 'https://www.kraken.com'
    },
  ]
    
  return(
    <div className="market-container">
      <h2>
        Exchanges
      </h2>
      <ul className="market">
          {
            marketList.map((item,index) => {
              return <li key={index}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a></li>
            })
          }
      </ul>
    </div>
  )
}

export default Market;