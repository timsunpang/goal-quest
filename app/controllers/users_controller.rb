class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save!
      flash[:notice] = "User created!"
      render :show
    else
      flash[:error] = "Invalid username/password combination"
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :session_token)
  end
end
