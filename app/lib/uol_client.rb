class UolClient
  URL = 'https://api.cotacoes.uol.com/currency/intraday/list/?format=JSON&' \
        'fields=bidvalue,askvalue,maxbid,minbid,variationbid,' \
        'variationpercentbid,openbidvalue,date&currency=%s&'

  CURRENCY_CODES = {
    'eur' => 5,
    'usd' => 1,
    'aud' => 19,
  }

  def self.get_currency_quotes(currency)
    unless CURRENCY_CODES.key?(currency)
      httparty_req = HTTParty::Request.new Net::HTTP::Get, '/'
      nethttp_resp = Net::HTTPNotFound.new('1.1', 404, 'Not found')
      return HTTParty::Response.new(httparty_req, nethttp_resp, lambda { '' }, body: '')
    end

    HTTParty.get(URL % CURRENCY_CODES[currency])
  end
end
