import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import moment from 'moment';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const DEFAULT_CURRENCY = 'usd';

class CurrencyQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency_quotes: null,
      currency: '',
    };
  }

  componentWillMount() {
    this.retrieveCurrencyQuotes(this.props.currency);
  }

  retrieveCurrencyQuotes = (currency) => {
    Axios.get(`currency_quotes/${currency}`)
      .then((response) => {
        this.setState({ currency_quotes: response.data, currency: currency });
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
      <div>
        <div>BRL quotation versus {this.state.currency.toUpperCase()}</div>

        <AreaChart width={800} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis
            dataKey="date"
            domain={['auto', 'auto']}
            name='Time'
            tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
            type='number'/>
          <YAxis
            dataKey='value'
            domain={['auto', 'auto']}
            name='Quote' />
          <Tooltip/>
          <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
        </AreaChart>

        <button onClick={() => { this.switchCurrency('usd'); }}>USD</button>
        <button onClick={() => { this.switchCurrency('eur'); }}>EUR</button>
        <button onClick={() => { this.switchCurrency('aud'); }}>AUD</button>
      </div>
    );
  }
}

CurrencyQuotes.propTypes = {
  currency: PropTypes.string
};

CurrencyQuotes.defaultProps = {
  currency: DEFAULT_CURRENCY,
};

export default CurrencyQuotes;
