class Api::GoalsController < ApplicationController
  def index
    @goals = current_user.goals
    render json: @goals
  end

  def create
    new_params = goals_params
    new_params["user_id"] = current_user.id
    @goal = Goal.new(new_params)
    if Goal.create!(new_params)
      render json: @goal
    else
      render json: @goal.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @goals = Goal.find_by_id(params[:id])
    render json: @goals
  end

  def update
    @goal = Goal.find_by_id(params[:id])
    @goal.update!(goals_params)
    render json: @goal
  end

  def destroy
    @goal = Goal.find_by_id(params[:id])
    Goal.destroy(params[:id])
    render json: @goal
  end

  private
  def goals_params
    params.require(:goal).permit(:title, :user_id, :card_id, :priority, :description, :completed)
  end
end
