import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CurrencyQuotes from './currency_quotes.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CurrencyQuotes />,
    document.body.appendChild(document.createElement('div')),
  )
})
