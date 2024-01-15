import string
from paddleocr import PaddleOCR, draw_ocr
import cv2

ocr = PaddleOCR(use_angle_cls=True, lang="en", det = False, show_log=False)

def paddle_reader(license_plate_crop):
    result = ocr.ocr(license_plate_crop, cls=True)
    try:
        text, score = result[0][0][1][0], result[0][0][1][1]
        print(text, score)
        return text, score
    except:
        return "",""

# Mapping dictionaries for character conversion
dict_char_to_int = {'O': '0',
                    'I': '1',
                    'J': '3',
                    'A': '4',
                    'G': '6',
                    'S': '5',
                    'B': '8'
                    }

dict_int_to_char = {'0': 'Q',
                    '1': 'I',
                    '3': 'J',
                    '4': 'A',
                    '6': 'G',
                    '5': 'S',
                    '8': 'B',

                    }



def write_csv(results, output_path):
    with open(output_path, 'w') as f:
        f.write('{},{},{},{},{},{},{},{}\n'.format('frame_nmr', 'car_id', 'car_bbox',
                                                'license_plate_bbox', 'license_plate_bbox_score', 'license_number',
                                                'license_number_score','base64_img','speed',))

        for frame_nmr in results.keys():
            for car_id in results[frame_nmr].keys():
                # print(results[frame_nmr][car_id])
                if 'car' in results[frame_nmr][car_id].keys() and \
                        'license_plate' in results[frame_nmr][car_id].keys() and \
                        'text' in results[frame_nmr][car_id]['license_plate'].keys():
                    f.write('{},{},{},{},{},{},{},{}\n'.format(frame_nmr,
                                                            car_id,
                                                            '[{} {} {} {}]'.format(
                                                                results[frame_nmr][car_id]['car']['bbox'][0],
                                                                results[frame_nmr][car_id]['car']['bbox'][1],
                                                                results[frame_nmr][car_id]['car']['bbox'][2],
                                                                results[frame_nmr][car_id]['car']['bbox'][3]),
                                                            '[{} {} {} {}]'.format(
                                                                results[frame_nmr][car_id]['license_plate']['bbox'][0],
                                                                results[frame_nmr][car_id]['license_plate']['bbox'][1],
                                                                results[frame_nmr][car_id]['license_plate']['bbox'][2],
                                                                results[frame_nmr][car_id]['license_plate']['bbox'][3]),
                                                            results[frame_nmr][car_id]['license_plate']['bbox_score'],
                                                            results[frame_nmr][car_id]['license_plate']['text'],
                                                            results[frame_nmr][car_id]['license_plate']['text_score'],
                                                            results[frame_nmr][car_id]['license_plate']['base64_img']
                                                            )
                            )
        f.close()


def license_complies_format(text):
    if len(text) == 7 and \
            (text[0] in string.ascii_uppercase or text[0] in dict_int_to_char.keys()) and \
            (text[1] in string.ascii_uppercase or text[1] in dict_int_to_char.keys()) and \
            (text[2] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[2] in dict_char_to_int.keys()) and \
            (text[3] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[3] in dict_char_to_int.keys()) and \
            (text[4] in string.ascii_uppercase or text[4] in dict_int_to_char.keys()) and \
            (text[5] in string.ascii_uppercase or text[5] in dict_int_to_char.keys()) and \
            (text[6] in string.ascii_uppercase or text[6] in dict_int_to_char.keys()):
        return True, 1
    
    elif len(text) == 9 and \
            (text[0] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[0] in dict_char_to_int.keys()) and \
            (text[1] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[1] in dict_char_to_int.keys()) and \
            (text[2] in string.ascii_uppercase or text[2] in dict_int_to_char.keys()) and \
            (text[3] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[3] in dict_char_to_int.keys()) and \
            (text[4] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[4] in dict_char_to_int.keys()) and \
            (text[5] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[5] in dict_char_to_int.keys()) and \
            (text[6] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[6] in dict_char_to_int.keys()) and \
            (text[7] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[7] in dict_char_to_int.keys()) and \
            (text[8] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[8] in dict_char_to_int.keys()) :
        return True, 2
    elif len(text) == 8 and \
            (text[0] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[0] in dict_char_to_int.keys()) and \
            (text[1] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[1] in dict_char_to_int.keys()) and \
            (text[2] in string.ascii_uppercase or text[2] in dict_int_to_char.keys()) and \
            (text[3] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[3] in dict_char_to_int.keys()) and \
            (text[4] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[4] in dict_char_to_int.keys()) and \
            (text[5] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[5] in dict_char_to_int.keys()) and \
            (text[6] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[6] in dict_char_to_int.keys()) and \
            (text[7] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[7] in dict_char_to_int.keys()) :

        return True, 3
    elif len(text) == 6 and \
            (text[0] in string.ascii_uppercase or text[0] in dict_int_to_char.keys()) and \
            (text[1] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[1] in dict_char_to_int.keys()) and \
            (text[2] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[2] in dict_char_to_int.keys()) and \
            (text[3] in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] or text[3] in dict_char_to_int.keys()) and \
            (text[4] in string.ascii_uppercase or text[4] in dict_int_to_char.keys()) and \
            (text[5] in string.ascii_uppercase or text[5] in dict_int_to_char.keys()):
        return True, 4
    
    else:
        return False, 0


def format_license(text, type):
    license_plate_ = ''
    mapping_type1 = {0: dict_int_to_char, 1: dict_int_to_char, 4: dict_int_to_char, 5: dict_int_to_char, 6: dict_int_to_char,
               2: dict_char_to_int, 3: dict_char_to_int}
    
    mapping_type2 = {
                     0: dict_char_to_int, 
                     1: dict_char_to_int, 
                     2: dict_int_to_char, 
                     3: dict_char_to_int, 
                     4: dict_char_to_int,
                     5: dict_char_to_int, 
                     6: dict_char_to_int,
                     7: dict_char_to_int,
                     8: dict_char_to_int
                    }
    
    mapping_type3 = {
                     0: dict_char_to_int, 
                     1: dict_char_to_int, 
                     2: dict_int_to_char, 
                     3: dict_char_to_int, 
                     4: dict_char_to_int,
                     5: dict_char_to_int, 
                     6: dict_char_to_int,
                     7: dict_char_to_int,
                    }
    mapping_type4 = {
                     0: dict_int_to_char, 
                     1: dict_char_to_int, 
                     2: dict_char_to_int, 
                     3: dict_char_to_int,
                     4: dict_int_to_char,
                     5: dict_int_to_char,
                    }
    if (type == 1):
        for j in [0, 1, 2, 3, 4, 5, 6]:
            if text[j] in mapping_type1[j].keys():
                license_plate_ += mapping_type1[j][text[j]]
            else:
                license_plate_ += text[j]
    elif (type == 2):
        for j in [0, 1, 2, 3, 4, 5, 6, 7, 8]:
            if text[j] in mapping_type2[j].keys():
                license_plate_ += mapping_type2[j][text[j]]
            else:
                license_plate_ += text[j]
    elif (type == 3):
        for j in [0, 1, 2, 3, 4, 5, 6, 7]:
            if text[j] in mapping_type3[j].keys():
                license_plate_ += mapping_type3[j][text[j]]
            else:
                license_plate_ += text[j]
    elif (type == 4):
        for j in [0, 1, 2, 3, 4, 5]:
            if text[j] in mapping_type4[j].keys():
                license_plate_ += mapping_type4[j][text[j]]
            else:
                license_plate_ += text[j]
    return license_plate_


def read_license_plate(license_plate_crop):
    text, score = paddle_reader(license_plate_crop)
    if (text != ""):
        text = text.upper().replace(' ', '').replace("(","").replace(")","").replace("[","").replace("]","").replace(",","").replace("-","").replace(".","")
        print("Raw text ---------------->", text)
        x, type = license_complies_format(text)
        if (x):
            return format_license(text, type), score
        
    return None, None


def get_car(license_plate, vehicle_track_ids):
    x1, y1, x2, y2, score, class_id = license_plate

    foundIt = False
    for j in range(len(vehicle_track_ids)):
        xcar1, ycar1, xcar2, ycar2, car_id = vehicle_track_ids[j]

        if x1 > xcar1 and y1 > ycar1 and x2 < xcar2 and y2 < ycar2:
            car_indx = j
            foundIt = True
            break

    if foundIt:
        return vehicle_track_ids[car_indx]

    return -1, -1, -1, -1, -1
