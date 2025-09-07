from DataCreate import app
from DataCreate import route  # pastikan route dipanggil biar endpoints ke-load

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))  # Railway kasih port dinamis
    app.run(host="0.0.0.0", port=port)
