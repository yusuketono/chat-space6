# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

run Rails.application
# ここの記述がないとエラー出る
# run Rails.application