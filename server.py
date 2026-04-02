#!/usr/bin/env python3
# ══════════════════════════════════════
# KasirGO — server.py (Python)
# Jalankan: python server.py
# Buka: http://localhost:3000
# ══════════════════════════════════════

import http.server
import socketserver
import os
import sys

PORT = 3000

class KasirGOHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        print(f"  [{self.address_string()}] {format % args}")

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(('', PORT), KasirGOHandler) as httpd:
        print('')
        print('  💙 KasirGO Server berjalan!')
        print('')
        print(f'  Buka di browser: http://localhost:{PORT}')
        print('')
        print('  Tekan Ctrl+C untuk menghentikan server.')
        print('')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\n  Server dihentikan. Sampai jumpa! 👋\n')
            sys.exit(0)

if __name__ == '__main__':
    main()
