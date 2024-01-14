
from flask import Flask
from flask_restful import Api, Resource

from modules.UserHandler import CreateUser, ChangePassword, Login, GetUsers
from modules.LrpHandle import  VideoReg, GetVidInfo
from modules.ViPhamHandle import CheckViPham, ThongKe

app = Flask(__name__)
api = Api(app)

import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'


api.add_resource(CreateUser, "/user/create-user")
api.add_resource(ChangePassword, "/user/change-password")
api.add_resource(Login, "/user/login")
api.add_resource(VideoReg, "/reg/video")
api.add_resource(GetVidInfo, "/log/info/")
api.add_resource(GetUsers, "/user/get-users/")
api.add_resource(ThongKe, "/vi-pham/thong-ke/")
api.add_resource(CheckViPham, "/vi-pham/check/")

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response


if __name__ == '__main__':
    app.run("0.0.0.0", 5000)
