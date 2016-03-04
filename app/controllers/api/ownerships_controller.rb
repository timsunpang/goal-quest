class Api::OwnershipsController < ApplicationController
  def index
    @ownerships = Ownership.all
    render json: @ownerships
  end

  def create
    new_params = ownership_params
    new_params["user_id"] = current_user.id
    @ownership = Ownership.new(new_params)
    if Ownership.create!(new_params)
      redirect_to :index
    else
      render json: @ownership.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @ownership = Ownership.find_by_id(params[:id])
    Ownership.destroy(params[:id])
    render json: @ownership
  end

  private
  def ownership_params
    params.require(:ownership).permit(:item_id, :user_id)
  end
end
