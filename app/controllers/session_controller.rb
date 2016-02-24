class SessionController < ApplicationController
  def new
    @user = User.new
    redirect_to root_url
  end

  def create
    @user = User.find_by_credentials(*user_params)
    if @user
      @user.sign_in
      redirect_to user_url
    else
      redirect_to root_url
    end
  end

  def destroy
    sign_out(current_user)
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :session_token)
  end
end
