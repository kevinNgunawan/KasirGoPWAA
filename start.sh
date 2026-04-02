#!/bin/bash
echo ""
echo " ========================"
echo "  KasirGO Server Launcher"
echo " ========================"
echo ""
echo " Pilih cara menjalankan server:"
echo ""
echo " [1] Node.js   (node server.js)"
echo " [2] Python    (python3 server.py)"
echo ""
read -p " Ketik 1 atau 2 lalu tekan Enter: " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo " Menjalankan KasirGO dengan Node.js..."
    node server.js
elif [ "$choice" = "2" ]; then
    echo ""
    echo " Menjalankan KasirGO dengan Python..."
    python3 server.py
else
    echo " Pilihan tidak valid."
fi
