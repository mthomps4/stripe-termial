class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    @q = Product.ransack(params[:q])
    @products = @q.result(distinct: true).order(created_at: :desc).page(params[:page]).per(params[:per_page])
    render :index
  end

  def show
    render :show
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render :show, status: :created
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @product.update(product_params)
      render :show
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    head :no_content
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :price)
  end
end