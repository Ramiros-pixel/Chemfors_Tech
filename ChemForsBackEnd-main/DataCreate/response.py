from flask import jsonify,make_response
def kata():
    print(">>> RESPONSE FILE INI DIPANGGIL <<<")
    return "ini dari response"


def success(data, message):
    response ={
        
        'data': data,
        'message': message,
   
    }
    return make_response(jsonify(response)), 200

def badreq(data, message):
    response ={

        'data': data,
        'message': message,
    
        }
    return make_response(jsonify(response)), 400

def error(data=None, message="Not Found"):
    response ={
        'data': data,
        'message': message,
       
    }
    return make_response(jsonify(response)), 404