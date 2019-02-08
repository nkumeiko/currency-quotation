require 'rails_helper'

RSpec.describe CurrencyQuotesController, type: :controller do
  describe 'GET /currency_quotes/:currency' do
    let(:uol_docs) { { docs: [{ date: '20190101100000', askvalue: 1 }] } }

    it 'returns data and status OK' do
      stub_request(:get, 'https://api.cotacoes.uol.com/currency/intraday/list/?currency=1&fields=bidvalue,askvalue,maxbid,minbid,variationbid,variationpercentbid,openbidvalue,date&format=JSON')
        .to_return(status: 200, body: JSON.generate(uol_docs), headers: { 'Content-Type' => 'application/json' })

      post :show, params: { currency: 'usd' }
      expect(response.status).to eq(200)
      expect(response.body).to eq([
        { date: '2019-01-01T10:00:00.000+00:00', value: 1 }
      ].to_json)
    end
  end
end
