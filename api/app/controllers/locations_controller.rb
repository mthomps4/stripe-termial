class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :update, :destroy]

  def index
    @q = Location.ransack(params[:q])
    per_page = params[:per_page] || 10
    page = params[:page] || 1
    @locations = @q.result(distinct: true).page(page).per(per_page)
    render json: {
      locations: @locations,
      meta: {
        total_pages: @locations.total_pages,
        total_count: @locations.total_count,
        current_page: @locations.current_page,
        per_page: @locations.limit_value,
        next_page: @locations.next_page,
        prev_page: @locations.prev_page
      }
    }
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
