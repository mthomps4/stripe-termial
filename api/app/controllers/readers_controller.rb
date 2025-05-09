class ReadersController < ApplicationController
  before_action :authenticate
  before_action :authenticate_admin, only: [ :destroy ]

  def index
    @q = Reader.ransack(params[:q])
    @readers = @q.result.order(created_at: :desc)
    render json: @readers
  end

  def show
    reader = Reader.find(params[:id])
    render json: reader
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Reader not found" }, status: :not_found
  end

  # REGISTRATION WITH STRIPE OCCURS VIA SDK
  def create
    reader = Reader.new(reader_params)

    if reader.save
      render json: reader, status: :created
    else
      render json: { errors: reader.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    reader = Reader.find(params[:id])
    if reader.update(update_params)
      ReaderService.update_reader(reader)
      render json: reader
    else
      render json: { errors: reader.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Reader not found" }, status: :not_found
  end

  def destroy
    reader = Reader.find(params[:id])
    reader.destroy
    head :no_content
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Reader not found" }, status: :not_found
  end

  private

  def update_params
    params.require(:reader).permit(:location_id, :label)
  end

  def reader_params
    params.require(:reader).permit(:location_id, :stripe_id, :label, :serial_number, :reader_type)
  end
end
