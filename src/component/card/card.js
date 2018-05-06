import React from "react";
import './card.css';

const Card = props => {
  let { name, symbol,quotes: {USD:{price}}, quotes: {USD:{market_cap}}, quotes:{USD:{percent_change_1h: change_1h}}, quotes:{USD:{percent_change_24h: change_24h}}, quotes:{USD:{percent_change_7d: change_7d}}} = props.data;
  let { curr_name: currency_name, curr_value: currency_value} = props.currency;
  let currency_round = currency_value && parseFloat(currency_value.toFixed(2))*price;
  let currency_formate = currency_round && parseFloat(currency_round.toFixed(2));
  var ss = parseInt(market_cap,10);
  var marketCap = ss.toLocaleString();
  console.log('currency', currency_round);
  return (
    <div className="indiv-card">
      <div className="img-holder">
        <img src={require(`../../img/crypto/${symbol}.png`)} alt={name} />
      </div>
      <div className="name-lab">{name}</div>
      <div className="symbol-lab">{symbol}</div>
      <div className="price-lab">
        <div className="">
          ${price}
        </div>
        {
          currency_value!==null ? <div className="">{currency_name} {currency_round && currency_formate.toLocaleString()}</div> : ''
        }
      </div>
      <div className="status-lab">
        <div>
          <span className="lab-width">1h: </span>
          <span className={Math.sign(change_1h)===1?'positive':'negative'}>{change_1h}%</span>
        </div>
      </div>
      <div className="market-cap-lab">Market Cap: ${marketCap}</div>
      <div className="status-day">
          <div className="left">
            <span className="lab-width">24h: </span>
            <span className={Math.sign(change_24h)===1?'positive':'negative'}>{change_24h}%</span>
          </div>
          <div className="right">
            <span className="lab-width">7days: </span>
            <span className={Math.sign(change_7d)===1?'positive':'negative'}>{change_7d}%</span>
          </div>
      </div>
    </div>
  );
};

export default Card;
