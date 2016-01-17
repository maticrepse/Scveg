class PostsController < ApplicationController
	def index
		@post=Post.new
		@users=current_user.following_users
		@posts=[]
		@users.each do |user|
				@posts += user.posts.all
		end
		@posts+=current_user.posts.all
		@posts=@posts.sort_by(&:created_at).reverse
	end
	def create
		# @user = current_user
	    #@post = @user.posts.create(post_params)
		#redirect_to user_path(@user)
		@post = current_user.posts.build(post_params)
		# @post.user_id=@user.id
		if @post.save
			redirect_to root_path
		else
			redirect_to root_path, notice: 'Unsuccessful!'

		end

	end

	def remove_photo
		@post = Post.find(params[:id])
		@post.avatar = nil
		@post.save
		render "edit"
	end

	def edit
		@post = current_user.posts.find(params[:id])
	end

	def update
  		@post = current_user.posts.find(params[:id])
 
  		if @post.update(post_params)
    		redirect_to root_path
  		else
    		render 'edit'
  		end
	end

	def destroy
	    @post = current_user.posts.find(params[:id])
	    @post.destroy
	    redirect_to root_path
	end

	private
		def post_params
			params.require(:post).permit(:body, :location, :date, :avatar)
		end





end
