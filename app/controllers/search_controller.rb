class SearchController < ApplicationController
	def search
		@results = User.where("email LIKE ?", "%#{params[:name]}%")
	end

	def hash
		@results = Post.where("body LIKE ? ESCAPE '#'", "%#{params[:hash]}%")
	end
end
