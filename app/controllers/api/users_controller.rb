class Api::UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def index
    @user = current_user
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      redirect_to new_api_user_url
    end
  end

  def show
    @user = User.find_by_id(params[:id])
    render json: @user
  end

  def update
    @user = current_user
    @user.update!(user_params)
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :level, :exp, :gold, :face_id, :head_id, :body_id, :legs_id, :weapon_id, :shield_id, :session_token)
  end
end
