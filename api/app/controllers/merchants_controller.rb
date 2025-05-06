class MerchantsController < ApplicationController
  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  def create_test_connect_account
    binding.pry
    Stripe::ConnectAccountService.new(current_user).create_test_account
  end
end
