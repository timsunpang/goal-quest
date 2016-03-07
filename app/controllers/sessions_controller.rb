class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    # debugger
    @user = User.find_by_credentials(*user_params.values)
    if @user
      flash[:notice] = ["Logged in"]
      sign_in(@user)
      redirect_to root_url
    else
      flash[:error] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out(current_user)
    redirect_to new_session_url
  end

  def guest
    @user = User.new(
      username: "guest" + (User.all.count + 1).to_s,

    )
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      redirect_to new_api_user_url
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :session_token)
  end
end
