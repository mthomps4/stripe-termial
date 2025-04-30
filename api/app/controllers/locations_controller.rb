class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :update, :destroy]

  def index
    @locations = Location.all
    render json: @locations
  end

  def show
    render json: @location
  end

  def create
    @location = Location.new(location_params)
    stripe_location = LocationService.create_location(@location)
    @location.stripe_id = stripe_location.id

    if @location.save
      render json: @location, status: :created
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def update
    if @location.update(update_params)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @location.destroy
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def update_params
    params.require(:location).permit(:name, :address_line1, :address_line2, :city, :state, :postal_code)
  end

  def location_params
    params.require(:location).permit(:name, :address_line1, :address_line2, :city, :state, :postal_code, :country)
  end
end
