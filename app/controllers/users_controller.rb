class UsersController < ApplicationController
	def show
		@user = User.find_by_id(params[:id])
		if @user
			@posts=@user.posts.all.sort_by(&:created_at).reverse
			#@posts=@posts.sort_by(&:created_at).reverse
		else
			index
		end
	end

	def edit
		@user = User.find(params[:id])
		if @user

		else
			index
		end
	end

	def follow
		user=User.find(params[:user])
		current_user.follow(user)
		redirect_to user_path(user)
	end

	def unfollow
		user=User.find(params[:user])
		current_user.stop_following(user)
		redirect_to user_path(user)
	end

	def update
  		@user = User.find(params[:id])
 
  		if @user.update(user_params)
    		redirect_to @user
  		else
    		render 'edit'
  		end
	end

	def index
		if current_user
     		redirect_to posts_path
   		else
     		redirect_to new_user_session_path, notice: 'You are not logged in.'
   		end
	end

	private 
		def user_params
			params.require(:user).permit(:avatar)
		end
end
#SELECT * FROM mytable
#WHERE column1 LIKE '%word1%'
#Client.all(:conditions =>
#  ["created_at >= :start_date AND created_at <= :end_date", { :start_date => params[:start_date], :end_date => params[:end_date] }])
# => User(	id: integer, email: string, encrypted_password: string, reset_password_token: string,
 # 			reset_password_sent_at: datetime, remember_created_at: datetime, sign_in_count: integer,
 # 			current_sign_in_at: datetime, last_sign_in_at: datetime, current_sign_in_ip: string,
#   		last_sign_in_ip: string, created_at: datetime, updated_at: datetime, confirmation_token: string,
#   		confirmed_at: datetime, confirmation_sent_at: datetime, avatar_file_name: string,
#     		avatar_content_type: string, avatar_file_size: integer, avatar_updated_at: datetime) 
