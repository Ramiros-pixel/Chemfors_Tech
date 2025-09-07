from DataCreate.user import dataUser
from DataCreate.DataChemy import DataSchema
from flask import request, jsonify
from DataCreate import db,app
from DataCreate import response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash

#>>>>>>>>>login user<<<<<<<<<<<<<
def tampilan(data):
    return {
        'id': data.id,
        'name': data.name,
        'email': data.email
    }

def login():
    try:
        # Debug: print form data
        print("Login form data:", dict(request.form))
        print("Content-Type:", request.content_type)
        print("Form keys:", list(request.form.keys()))
        
        # Handle potential spaces in field names
        email = request.form.get('email') or request.form.get('email ') or request.form.get(' email')
        password = request.form.get('password') or request.form.get('password ') or request.form.get(' password')
        
        print(f"Received - email: '{email}', password: '{password}'")
        
        if not email or not password:
            return response.error(400, 'Email and password are required')
        
        user = dataUser.query.filter_by(email=email).first()
        
        if not user:
            return response.error(404, 'User not found')
        
        if not check_password_hash(user.password, password):
            return response.error(400, 'Invalid password')

        data = tampilan(user)
        expires = timedelta(hours=5)
        expires_refresh = timedelta(days=7)

        access_token = create_access_token(
            identity=str(user.id),
            additional_claims=data,
            fresh=True,
            expires_delta=expires
        )
        refresh_token = create_access_token(
            identity=str(user.id),
            additional_claims=data,
            fresh=False,
            expires_delta=expires_refresh
        )

        return response.success({
            'access_token': access_token,
            'refresh_token': refresh_token
        }, 'Login successful')
    
    except Exception as e:
        import traceback
        print(f"Login error: {str(e)}")
        print("Traceback:")
        traceback.print_exc()
        app.logger.error(f"Login error: {str(e)}")
        return response.error(500, f'Error: {str(e)}')
        
#Fungsi data kimia
def wholeChemy(chemy):
    chemy={
        'posisi': chemy.posisi,
        'suhu':chemy.suhu,
        'tekanan':chemy.tekanan,
        'entalpi':chemy.entalpi,
        'massa':chemy.massa

    }
    return chemy
def showChemy():
    try:
        chemyData = DataSchema.query.all()
        kimia = [wholeChemy(i) for i in chemyData]
        return response.success(kimia, 'Success')
    except Exception as e:
        return response.error(404, f'server error: {str(e)}')

def addChemy():
    try:
        user_id = get_jwt_identity()   # ambil user id dari JWT
    

        new_data = DataSchema(
        posisi = request.form.get("posisi"),
        suhu=request.form.get("suhu"),
        tekanan=request.form.get("tekanan"),
        entalpi=request.form.get("entalpi"),
        massa=request.form.get("massa"),
        id_user=user_id          # foreign key otomatis isi id user
    )

        db.session.add(new_data)
        db.session.commit()
        return jsonify({"msg": "Data berhasil disimpan"})   
    
    #     suhu = request.form.get('suhu')
    #     tekanan = request.form.get('tekanan')
    #     volume = request.form.get('volume')
    #     entropi = request.form.get('entropi')  
    #     entalpi = request.form.get('entalpi')
    #     energi_dalam= request.form.get('energi_dalam')
    #     massa = request.form.get('massa')
    #     jumlah_mol = request.form.get('jumlah_mol')

    #     dataChemy = DataSchema(suhu= suhu, tekanan = tekanan, volume=volume,entropi=entropi, entalpi=entalpi, energi_dalam=energi_dalam, massa=massa, jumlah_mol=jumlah_mol)
    #     db.session.add(dataChemy)
    #     db.session.commit()
    #     return response.success(200, 'data ditambahkan')
    except Exception as e:
         return response.error(500, f'server error: {str(e)}')
    
    
#>>>>>>>>>add user<<<<<<<<<<<<<<
def addUser():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        alamat = request.form.get('alamat')
        password = request.form.get('password')
        # cek debug
        if not email:
            return response.error(400, 'email is required')
        if not name:
            return response.error(400, 'name is required')
        if not alamat:
            return response.error(400, 'Alamat is required')
        if not password:
            return response.error(400, 'Password is required')
        
        data = dataUser(name=name, email=email, alamat=alamat)
        data.setPassword(password)
        db.session.add(data)
        db.session.commit()
        return response.success(200, 'alhamdulillah')

    except IntegrityError as e:
        db.session.rollback()
        app.logger.error(f"Database integrity error: {str(e)}")
        return response.error(400, 'Email already exists or database constraint violation')
    
    except AttributeError as e:
        db.session.rollback()
        app.logger.error(f"Attribute error: {str(e)}")
        return response.error(500, 'setPassword method not found')
    
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Unexpected error: {str(e)}")
        return response.error(500, f'Server error: {str(e)}')
    
#>>>>>>>>>show data<<<<<<<<<<<<<< 
def wholeData(data):
    data = {
        'id':data.id,
        'name':data.name,
        'alamat':data.alamat,
        'email':data.email,
        'created_at':data.created_at,
        'updated_at':data.updated_at}
    return data 
def showData():
    try:
        users= dataUser.query.all() 
        data = [wholeData(i) for i in users]
        return response.success(200, data)
    except Exception as e:
        return response.error(404, f'Server error: {str(e)}')
    
#>>>>>>>>>Delete Data<<<<<<<<<<<<<<
def deleteData(id):
    try:
        id = dataUser.query.filter_by(id=id).first()
        if not id:
            return response.error(404, 'Data not found')
        db.session.delete(id)
        db.session.commit()
        return response.success(200,'data delete success')
    except Exception as e:
        return response.error(404, f'server error {str(e)}')
