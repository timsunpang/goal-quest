class Api::ItemsController < ApplicationController
  def index
    @items = Item.all
  end

  def show
    @item = Item.find_by_id(params[:id])
    render json: @item
  end
end
