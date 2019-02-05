class CurrencyQuotesFetcher
  URL = 'https://api.cotacoes.uol.com/currency/intraday/list/?format=JSON&' \
        'fields=bidvalue,askvalue,maxbid,minbid,variationbid,' \
        'variationpercentbid,openbidvalue,date&currency=%s&'

  CURRENCY_CODES = {
    eur: 5,
    usd: 1,
    aud: 19,
  }

  def self.fetch(currency)
    return {} unless CURRENCY_CODES.key?(currency)

    response = HTTParty.get(URL % CURRENCY_CODES[currency])
    return {} unless (200..299).include?(response.code)

    JSON.parse(response.body)
  end
end


