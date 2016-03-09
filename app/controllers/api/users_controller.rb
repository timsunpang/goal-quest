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
      Goal.create(user_id: current_user.id, title: "Welcome to Goal Quest!")
      Goal.create(user_id: current_user.id, title: "Create Goals and Complete Them!")
      Goal.create(user_id: current_user.id, title: "Win experience and gold!")
      Goal.create(user_id: current_user.id, title: "Use gold to buy new armor and weapons at the shop!")
      Goal.create(user_id: current_user.id, title: "Equip new armor under the eqipment page!")
      Goal.create(user_id: current_user.id, title: "Hover over this text to add, edit, or complete a goal!")
      Ownership.create(user_id: current_user.id, item_id: 100)
      Ownership.create(user_id: current_user.id, item_id: 101)
      Ownership.create(user_id: current_user.id, item_id: 102)
      Ownership.create(user_id: current_user.id, item_id: 103)
      Ownership.create(user_id: current_user.id, item_id: 104)
      Ownership.create(user_id: current_user.id, item_id: 105)
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
