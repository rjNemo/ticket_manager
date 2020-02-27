ROOT=https://localhost:5001/api/v1
FILE=Scripts/response.json

rm $FILE
date >> $FILE

URL=$ROOT/projects/1/members
cat $URL >> $FILE

curl --insecure $URL | json_pp >> $FILE