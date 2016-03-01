class Api::GoalsController < ApplicationController
  def index
    @goals = Goal.all
    render json: @goals
  end

  def create
    @goals = Goal.new(goals_params)
    if Goal.create!(goals_params)
      render json: @goals
    else
      render json: @goals.errors.full_messages, status: :unprocessable_entity
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
