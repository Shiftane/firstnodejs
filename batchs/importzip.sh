iconv -f ISO-8859-1 -t utf-8 ../data/plz_l_20130922.txt > ../data/zip-utf8.txt

../../mongodb-osx-x86_64-2.4.6/bin/mongoimport -d mydb -c localities --type tsv --file ../data/zip-utf8.txt -f "_id,other1,NPA,other2,Name,Name2,Canton"
