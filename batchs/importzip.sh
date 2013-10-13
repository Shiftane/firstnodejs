curl -o ../data/zip-ori.zip https://match.post.ch/download?file=10000&tid=10&rol=0
unzip ../data/zip-ori.zip
iconv -f ISO-8859-1 -t utf-8 ../data/dasfas.txt > ../data/zip-utf8.txt

../../mongodb-osx-x86_64-2.4.6/bin/mongoimport -d mydb -c localities --type tsv --file ../data/zip-utf8.txt -f "_id,other1,NPA,other2,Name,Name2,Canton"
