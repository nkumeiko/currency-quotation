class CurrencyQuote
  include ActiveModel::Model

  attr_accessor :date,
                :value

  def self.by_currency(currency)
    response = UolClient.get_currency_quotes(currency)
    response.parsed_response['docs'].map do |doc|
      new(
        date: Time.parse(doc['date']),
        value: doc['askvalue']
      )
    end
  end
end
