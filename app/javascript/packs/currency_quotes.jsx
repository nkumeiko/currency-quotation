import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import moment from 'moment';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const DEFAULT_CURRENCY = 'usd';
const REFRESH_TIME = 300000;

class CurrencyQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency_quotes: null,
      currency: this.props.currency,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.retrieveCurrencyQuotes(this.state.currency), REFRESH_TIME);
  }

  componentWillMount() {
    this.retrieveCurrencyQuotes(this.state.currency);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  retrieveCurrencyQuotes = (currency) => {
    this.setState({ currency: currency });

    Axios.get(`currency_quotes/${currency}`)
      .then((response) => {
        this.setState({ currency_quotes: response.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  switchCurrency = (currency) => {
    this.retrieveCurrencyQuotes(currency);
  }

  render() {
    const data = [];

    if (this.state.currency_quotes) {
      this.state.currency_quotes.forEach((key, index) => {
        data.push({ date: new Date(key['date']).getTime(), value: key['value'] });
      });
    }

    return (
      <div className="currency-quotes">
        <div className="currency-quotes__title">BRL quotation versus {this.state.currency.toUpperCase()}</div>
        <div className="currency-quotes__hint">click to switch to:</div>
        <button
          className="currency-quotes__button"
          onClick={() => { this.switchCurrency('usd'); }}
          disabled={this.state.currency == 'usd'}>
          USD
        </button>
        <button
          className="currency-quotes__button"
          onClick={() => { this.switchCurrency('eur'); }}
          disabled={this.state.currency == 'eur'}>
          EUR
        </button>
        <button
          className="currency-quotes__button"
          onClick={() => { this.switchCurrency('aud'); }}
          disabled={this.state.currency == 'aud'}>
          AUD
        </button>
        <AreaChart width={800} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}} className="currency-quotes__graph">
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis
            dataKey="date"
            domain={['auto', 'auto']}
            name='Time'
            tickFormatter={(unixTime) => moment(unixTime).utc().format('HH:mm')}
            type='number'/>
          <YAxis
            dataKey='value'
            domain={['auto', 'auto']}
            name='Quote' />
          <Tooltip labelFormatter={(value) => moment(value).utc().format('HH:mm')}/>
          <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>
      </div>
    );
  }
}

CurrencyQuotes.propTypes = {
  currency: PropTypes.string,
};

CurrencyQuotes.defaultProps = {
  currency: DEFAULT_CURRENCY,
};

export default CurrencyQuotes;
