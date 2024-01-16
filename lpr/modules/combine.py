from ultralytics import YOLO
import cv2
import pandas as pd
import numpy as np
from modules.sort.sort import *
from modules.util import get_car, read_license_plate, write_csv
import os
import pandas as pd
from difflib import SequenceMatcher


os.environ[ "OPENCV_FFMPEG_READ_ATTEMPTS"] = "1000000"
os.environ['KMP_DUPLICATE_LIB_OK']='True'

coco_model_path = "C:\\Users\\ADMIN\\Desktop\\traffic_lpr\\lpr\\modules\\yolov8n.pt"
lpr_model_path  = "C:\\Users\\ADMIN\\Desktop\\traffic_lpr\\lpr\\modules\\license_detector.pt"


# Function to convert bounding box string to a list of floats
def convert_bbox_to_list(bbox_str):
    return list(map(float, bbox_str.strip('[]').split()))


# Function to calculate distance between two points
def calculate_distance(x1, y1, x2, y2):
    return np.sqrt((x2 - x1)**2 + (y2 - y1)**2)


# Function to calculate the center of a bounding box
def get_center(bbox):
    x1, y1, x2, y2 = bbox
    return (x1 + x2) / 2, (y1 + y2) / 2



def read_lpr(video_path):
    results = {}
    mot_tracker = Sort(iou_threshold=0.8)
    result_path = './test.csv'

    # load models
    coco_model = YOLO(coco_model_path)
    license_plate_detector = YOLO(lpr_model_path)

    # load video
    cap = cv2.VideoCapture(video_path)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print("FPS --------------", fps)
    # Tạo VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('output_video.mp4', fourcc, fps, (1280, 384 * 2))
    vehicles = [2, 3, 5, 7]

    # read frames
    frame_nmr = -1
    ret = True
    cnt = 0
    while ret:
        cnt = cnt + 1
        print(cnt)
        frame_nmr += 1
        ret, frame = cap.read()

        if ret:
            results[frame_nmr] = {}
           
            detections = coco_model.predict(frame, imgsz=1024)[0]
            detections_ = []

            for detection in detections.boxes.data.tolist():
                x1, y1, x2, y2, score, class_id = detection
                if int(class_id) in vehicles:
                    detections_.append([x1, y1, x2, y2, score])

            track_ids = mot_tracker.update(np.asarray(detections_))
            license_plates = license_plate_detector.predict(frame, imgsz=1024)[0]

            for license_plate in license_plates.boxes.data.tolist():
                x1, y1, x2, y2, score, class_id = license_plate
                xcar1, ycar1, xcar2, ycar2, car_id = get_car(license_plate, track_ids)
                license_plate_crop = frame[int(y1):int(y2), int(x1):int(x2), :]
                license_plate_crop_gray = cv2.cvtColor(license_plate_crop, cv2.COLOR_BGR2GRAY)
                license_plate_text, license_plate_text_score = read_license_plate(license_plate_crop_gray)

                # Draw bounding box and license plate information on the frame
                cv2.rectangle(frame, (int(xcar1), int(ycar1)), (int(xcar2), int(ycar2)), (0, 255, 0), 2)
                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 0), 2)

                from PIL import Image
                from io import BytesIO
                import base64

                img = Image.fromarray(license_plate_crop)
                im_file = BytesIO()
                img.save(im_file, format="JPEG")
                im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
                img_b64 = base64.b64encode(im_bytes)

                print(license_plate_text)
                if license_plate_text is not None:
                    results[frame_nmr][car_id] = {
                        'car': {'bbox': [xcar1, ycar1, xcar2, ycar2]},
                        'license_plate': {
                            'bbox': [x1, y1, x2, y2],
                            'text': license_plate_text,
                            'bbox_score': score,
                            'text_score': license_plate_text_score,
                            'base64_img': img_b64
                        }
                    }

                    cv2.putText(frame, f'Car {car_id}', (int(xcar1), int(ycar1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                                (0, 255, 0), 2)
                    cv2.putText(frame, f'Plate: {license_plate_text}', (int(x1), int(y1) - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 0), 2)
                else:
                    results[frame_nmr][car_id] = {
                        'car': {'bbox': [xcar1, ycar1, xcar2, ycar2]},
                        'license_plate': {
                            'bbox': [x1, y1, x2, y2],
                            'text': "empty",
                            'bbox_score': score,
                            'text_score': 0,
                            'base64_img': img_b64
                        }
                    }
                    cv2.putText(frame, f'Car {car_id}', (int(xcar1), int(ycar1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                                (0, 255, 0), 2)
            frame = cv2.resize(frame, (1280, 384 * 2))

            out.write(frame)

    cap.release()
    cv2.destroyAllWindows()

    # Write results to CSV
    write_csv(results, result_path)
    return result_path, fps


def calculate_speed(result_path, fps):
    data = pd.read_csv(result_path)
    frame_rate = fps  
    alpha = 0.18
    print(frame_rate)

    # Convert bounding box strings to lists
    data['car_bbox'] = data['car_bbox'].apply(convert_bbox_to_list)

    # Add a column for the center of the car bounding box
    data['car_center'] = data['car_bbox'].apply(get_center)

    # Calculate speed for each car
    speeds = []
    final_df = pd.DataFrame(columns = ['frame_nmr','car_id','car_bbox','license_plate_bbox','license_plate_bbox_score','license_number','license_number_score','speed'])
    for car_id in data['car_id'].unique():
        car_data = data[data['car_id'] == car_id].sort_values(by='frame_nmr')
        max_conf_row = car_data.loc[car_data['license_number_score'].idxmax()]
        if(1>0):
            prev_row = car_data.iloc[0]
            current_row = car_data.iloc[len(car_data)-1]
            # Calculate distance traveled between frames
            x1, y1 = prev_row['car_center']
            x2, y2 = current_row['car_center']
            distance = calculate_distance(x1, y1, x2, y2)

            # Calculate time elapsed
            time_elapsed = (current_row['frame_nmr'] - prev_row['frame_nmr']) / frame_rate

            # Calculate speed (distance/time) and append to speeds list
            if time_elapsed > 0 and distance >0:
                speed = distance / time_elapsed * alpha
                max_conf_row['speed'] = speed
            else:
                max_conf_row['speed'] = 0
            
        # print(max_conf_row)
        final_df = pd.concat([final_df, pd.DataFrame([max_conf_row])], ignore_index=True)

    number_of_car = len(data['car_id'].unique())
    final_df.dropna(subset=['speed'])

    # loại bỏ các dòng có speed = 0
    final_df = final_df[final_df['speed'] != 0]
    final_df = final_df[final_df['license_number'] != 'empty'].sort_values('license_plate_bbox_score', ascending=False).drop_duplicates('license_number')
    # final_df = remove_duplicates(final_df, 0.7)
    final_df = final_df[final_df['license_number'] != 'empty']
    return (final_df, number_of_car)

