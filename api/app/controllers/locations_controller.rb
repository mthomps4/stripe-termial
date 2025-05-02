class LocationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :index, :show ]
  before_action :set_location, only: [ :show, :update, :destroy ]

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
    begin
      # Create in Stripe first
      stripe_location = LocationService.create_location(location_params)
      
      # Then create locally with the stripe_id
      @location = Location.new(location_params.merge(stripe_id: stripe_location.id))

      if @location.save
        render json: @location, status: :created
      else
        # If local save fails, we should probably cleanup the Stripe location
        # LocationService.delete_location(stripe_location.id) # Uncomment if you want this behavior
        render json: @location.errors, status: :unprocessable_entity
      end
    rescue => e
      render json: { error: "Failed to create location: #{e.message}" }, status: :unprocessable_entity
    end
  end

  def update
    if @location.update(location_params)
      # Update in Stripe
      LocationService.update_location(@location)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @location.destroy
    head :no_content
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :address_line1, :address_line2, :city, :state, :postal_code, :country)
  end
end
