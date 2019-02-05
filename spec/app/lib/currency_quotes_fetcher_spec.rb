require 'rails_helper'

RSpec.describe CurrencyQuotesFetcher do
  let(:data) { { 'data' => [{ 'id' => 1 }] } }
  subject { described_class.fetch(currency) }

  context 'when known currency' do
    let(:currency) { :usd }

    it 'returns data' do
      stub = stub_request(:get, "https://api.cotacoes.uol.com/currency/intraday/list/?currency=1&fields=bidvalue,askvalue,maxbid,minbid,variationbid,variationpercentbid,openbidvalue,date&format=JSON")
        .to_return(status: 200, body: JSON.generate(data))
      is_expected.to eq data
      expect(stub).to have_been_requested.once
    end

    it 'returns data' do
      stub = stub_request(:get, "https://api.cotacoes.uol.com/currency/intraday/list/?currency=1&fields=bidvalue,askvalue,maxbid,minbid,variationbid,variationpercentbid,openbidvalue,date&format=JSON")
        .to_return(status: 500)
      is_expected.to eq({})
    end
  end

  context 'when unknown currency' do
    let(:currency) { :unknown }

    it 'returns empty result' do
      is_expected.to eq({})
    end
  end
end
