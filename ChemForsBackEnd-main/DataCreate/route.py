from flask import request
from flask import request, jsonify
from DataCreate import app
from DataCreate.ControllerUser import addUser, showData, login,addChemy,showChemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity,get_jwt
from DataCreate import response
from DataCreate.sistemHitung import hitung_efisiensi, get_hasil_perhitungan
from flask import jsonify
from DataCreate import db,app


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    jwt_cur = get_jwt()
    claims = get_jwt() 
    current_user = {'id': jwt_cur.get('id')
                    , 'name': jwt_cur.get('name')
                    , 'email': jwt_cur.get('email')
                    , 'level': jwt_cur.get('level')
                    }
    return response.success(current_user,"Success")

#Menampilkan data sesuai token
@app.route("/data", methods=["POST", "GET"])
@jwt_required()
def DataChemy():
    if request.method == "POST":
        return addChemy()
    else:
        return showChemy()

from DataCreate.ControllerUser import addUser, showData, login

@app.route('/')
def index():
    return "Hello World"
    return jsonify({"message": "ChemFors Backend API", "status": "running"})



@app.route('/user', methods=['POST', 'GET'])
def Users():
    if request.method == 'POST':
        return addUser()
    else:
        return showData()
 
#menambahkan user
@app.route('/signUp', methods=['POST', 'GET'])
def SignUp():
    if request.method == 'POST':
        return addUser()
    else:
        return showData()

#Login

@app.route('/login', methods=['POST'])
def Login():
    return login()

#Menambahkan dataChemy

@app.route('/data', methods=['POST'])
def add_data():
    return 'cek'
#Menambahkan fungsi hitung
@app.route('/hasil_hitung', methods=['GET'])
@jwt_required()
def hasil_hitung():
    user_id = get_jwt_identity()
    return get_hasil_perhitungan(user_id)

@app.route('/calculate', methods=['POST'])
@jwt_required()
def calculate():
    user_id = get_jwt_identity()
    return hitung_efisiensi(user_id)
@app.route('/rot', methods=['GET'])
def wel():
    return jsonify({"message": "assalamualaikum"})

# Debug: Print all routes
print("Registered routes:")
for rule in app.url_map.iter_rules():
    print(f"{rule.endpoint}: {rule.rule} {rule.methods}")
