from DataCreate.DataChemy import DataSchema
from DataCreate import response, db
from config import Config 
from datetime import datetime

#kolom database
class tampungHasil(db.Model):
    __tablename__ = "tampung_hasil"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey('data_user.id'))
    kerjaAktual_turbin = db.Column(db.Float, nullable=False)
    energiPanas_masuk = db.Column(db.Float, nullable=False)
    efisiensi = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return '<tampung_hasil{}>'.format(self.id)

def hitung_efisiensi(user_id):
    try:
        # Ambil data terbaru inlet & outlet untuk user tertentu
        inlet = (
            db.session.query(DataSchema)
            .filter_by(id_user=user_id, posisi="inlet")
            .order_by(DataSchema.created_at.desc())
            .first()
        )
        outlet = (
            db.session.query(DataSchema)
            .filter_by(id_user=user_id, posisi="outlet")
            .order_by(DataSchema.created_at.desc())
            .first()
        )

        if not inlet or not outlet:
            return response.error(404, "Data inlet atau outlet tidak ditemukan")

        warnings = []
        h_in = inlet.entalpi or 0
        h_out = outlet.entalpi or 0
        m = inlet.massa or 1  # default 1

        if inlet.entalpi is None:
            warnings.append("Entalpi inlet kosong, diasumsikan 0")
        if outlet.entalpi is None:
            warnings.append("Entalpi outlet kosong, diasumsikan 0")
        if inlet.massa is None:
            warnings.append("Massa kosong, diasumsikan 1")

        # Hitung kerja aktual turbin
        w_actual = m * (h_in - h_out)

        # Energi masuk
        q_in = m * h_in

        if q_in == 0:
            return response.error(400, "Energi masuk nol, tidak bisa hitung efisiensi")

        eta = w_actual / q_in

        # Simpan hasil ke database
        hasil = tampungHasil(
            id_user=user_id,
            kerjaAktual_turbin=w_actual,
            energiPanas_masuk=q_in,
            efisiensi=eta
        )
        
        db.session.add(hasil)
        db.session.commit()

        return response.success(
            {
                "id_hasil": hasil.id,
                "w_actual": w_actual,
                "q_in": q_in,
                "efisiensi": eta,
                "efisiensi_persen": eta * 100,
                "warnings": warnings
            },
            "Perhitungan berhasil dan disimpan"
        )

    except Exception as e:
        db.session.rollback()
        return response.error(500, f"Server error: {str(e)}")

def get_hasil_perhitungan(user_id):
    """
    Ambil semua hasil perhitungan untuk user tertentu
    """
    try:
        hasil_list = tampungHasil.query.filter_by(id_user=user_id).order_by(tampungHasil.created_at.desc()).all()
        
        data = []
        for hasil in hasil_list:
            data.append({
                "id": hasil.id,
                "kerja_aktual": hasil.kerjaAktual_turbin,
                "energi_masuk": hasil.energiPanas_masuk,
                "efisiensi": hasil.efisiensi,
                "efisiensi_persen": hasil.efisiensi * 100,
                "created_at": hasil.created_at.isoformat() if hasil.created_at else None
            })
        
        return response.success(data, "Data hasil perhitungan berhasil diambil")
    
    except Exception as e:
        return response.error(500, f"Server error: {str(e)}")