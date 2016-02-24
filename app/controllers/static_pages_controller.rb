class StaticPagesController < ApplicationController
  def root
    if signed_in?
      render :root
    else
      render :login
    end
  end
end
