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
      password: 111111,
      gold: 5000
    )
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

  private
  def user_params
    params.require(:user).permit(:username, :password, :session_token)
  end
end
