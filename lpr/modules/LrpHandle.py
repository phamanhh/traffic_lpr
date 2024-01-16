import torch
import pickle
from flask_restful import Resource, reqparse
from flask import send_file
import base64
import numpy as np
import cv2
from flask import Flask, render_template, request, redirect, url_for
import os
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore, storage
from config import firebase_config
import uuid
from pymongo import MongoClient
from config import URI, PRIVATE_KEY
from PIL import Image
from io import BytesIO
import shutil
from datetime import datetime
import jwt
from modules.combine import *

import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

cred = credentials.Certificate("service_account.json")
firebase_admin.initialize_app(cred, firebase_config)

class VideoReg(Resource):
    def post(self):
        token = request.form['token']
        maxSpeed = int(request.form['maxSpeed'])
        user = jwt.decode(token, PRIVATE_KEY, algorithms=["HS256"])
        print(user['role'])
        if user['role']=='user':
            return {
                "error": True,
                "message": "Not enough permission",
                "data" : None,
            }
        vid_id = uuid.uuid4().hex
        file = request.files['file']
        file.save("response.mp4")
        result_path, fps = read_lpr("C:\\Users\\ADMIN\\Desktop\\traffic_lpr\\lpr\\response.mp4")
        final_df, number_of_car = calculate_speed(result_path, fps)
        bucket = storage.bucket()
        blob = bucket.blob('response.mp4')
        outfile='C:\\Users\\ADMIN\\Desktop\\traffic_lpr\\lpr\\output_video.mp4'
        with open(outfile, 'rb') as my_file:
            blob.upload_from_file(my_file)
        blob.make_public()

        l = []
        for idx in final_df.index:
            speed = final_df.loc[idx, "speed"].round()
            plate = final_df.loc[idx, "license_number"]
            base64_img = final_df.loc[idx, "base64_img"]
            import math
            x = math.isnan(speed)
            if (x == False and int(speed)>maxSpeed):
                l.append({
                    "image" : base64_img[1:].replace("'",""),
                    "speed" : speed,
                    "plate" : plate,
                    "speeding" : True,
                    "date" : datetime.strftime(datetime.now(), "%Y-%m-%d")
                })
                collection = MongoClient(URI).main.vi_pham
                collection.insert_one({
                    "image" : base64_img[1:].replace("'",""),
                    "speed" : speed,
                    "plate" : plate,
                    "speeding" : True,
                    "date" : datetime.strftime(datetime.now(), "%Y-%m-%d")
                })
            else:
                l.append({
                    "image" : base64_img[1:].replace("'",""),
                    "speed" : speed,
                    "plate" : plate,
                    "speeding" : False,
                })

        item = {
            "vid_id" : vid_id,
            "list" : l,
            "count" : len(l),
            # "count" : number_of_car,
            "date" : datetime.strftime(datetime.now(), "%Y-%m-%d")
        }
        collection = MongoClient(URI).main.log_video
        collection.insert_one(item)
        return  {
            "error": False,
            "message": "Success",
            "data" : {
                "cloudPath" : blob.public_url,
                "video_id" : vid_id,
            }
        }


class GetVidInfo(Resource):
    def __init__(self) -> None:
        self.collection = MongoClient(URI).main.log_video
        args = reqparse.RequestParser()
        args.add_argument("vid_id", type=str, required=True, help="video_id is missing")
        args.add_argument("page", type=int, required=True, help="token is missing")
        self.args = args

    def post(self):
        args = self.args.parse_args()
        item = self.collection.find_one({"vid_id": args['vid_id']})

        len_ = len(item['list'])
        print(len_)
        return {
            "error": False,
            "message": "",
            "data" : {
                "count" : item['count'],
                "list" : item['list'][(args['page']-1)*10: args['page']*10],
                "len":   len_
            },
        }
