class CurrencyQuote
  include ActiveModel::Model

  attr_accessor :date,
                :value

  class << self
    def by_currency(currency)
      uol_docs_for(currency).map do |doc|
        new(
          date: Time.parse(doc['date']),
          value: doc['askvalue']
        )
      end
    end

    private

    def uol_docs_for(currency)
      Rails.cache.fetch "uol-client-response-#{currency}", expires_in: 1.minute do
        response = UolClient.get_currency_quotes(currency)
        response.parsed_response['docs']
      end
    end
  end
end
