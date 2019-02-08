class CurrencyQuotesController < ApplicationController
  def show
    render json: CurrencyQuote.by_currency(currency_params[:currency])
  end

  private

  def currency_params
    params.permit(:currency)
  end
end
