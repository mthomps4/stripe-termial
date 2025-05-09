class ProductsController < ApplicationController
  before_action :set_product, only: [ :show, :update, :destroy ]
  before_action :authenticate, only: [ :index, :show ]
  before_action :authenticate_admin, only: [ :create, :update, :destroy ]

  def index
    @q = Product.ransack(params[:q])
    @products = @q.result(distinct: true).order(created_at: :desc).page(params[:page]).per(params[:per_page])
    render "api/products/index", status: :ok
  rescue => e
    puts("Error showing products: #{e.message}")
    render json: { error: e.message }, status: :internal_server_error
  end

  def show
    render "api/products/show", status: :ok
  rescue => e
    puts("Error showing product: #{e.message}")
    render json: { error: e.message }, status: :internal_server_error
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render "api/products/show", status: :created
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  rescue => e
    puts("Error creating product: #{e.message}")
    render json: { error: e.message }, status: :internal_server_error
  end

  def update
    if @product.update(product_params)
      render "api/products/show", status: :ok
    else
      render json: { errors: @product.errors }, status: :unprocessable_entity
    end
  rescue => e
    puts("Error updating product: #{e.message}")
    render json: { error: e.message }, status: :internal_server_error
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
