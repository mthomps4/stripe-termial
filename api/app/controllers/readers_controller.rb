class ReadersController < ApplicationController
  def index
    readers = Reader.all
    render json: readers
  end

  def show
    reader = Reader.find(params[:id])
    render json: reader
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Reader not found' }, status: :not_found
  end

  # REGISTER NEW READER
  def create
    reader = Reader.new(reader_params)
    stripe_reader = ReaderService.create_reader(@reader)
    reader.serial_number = stripe_reader.serial_number

    if reader.save
      render json: reader, status: :created
    else
      render json: { errors: reader.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    reader = Reader.find(params[:id])
    if reader.update(reader_params)
      render json: reader
    else
      render json: { errors: reader.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Reader not found' }, status: :not_found
  end

  def destroy
    reader = Reader.find(params[:id])
    reader.destroy
    head :no_content
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Reader not found' }, status: :not_found
  end

  private

  def reader_params
    params.require(:reader).permit(:location_id, :stripe_id, :label, :serial_number, :reader_type)
  end
end
