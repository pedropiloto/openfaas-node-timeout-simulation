# Node Openfaas Timeout Simulation

## Steps to reproduce:
1 - Build -`faas-cli build -f test.yml`

2 - Deploy - `faas-cli deploy --image test --name test --gateway http://127.0.0.1:8080 --env exec_timeout=2s`

3 - Make a request that will execute a non-infinite loop on the function: `curl --location --request GET 'http://127.0.0.1:8080/function/test' \
--header 'Content-Type: application/json' \
--data-raw '{
	"code": 2
}'` - It will surely work properly and return 200 HTTP status code

4 - Make a request that will execute a infinite loop on the function: `curl --location --request GET 'http://127.0.0.1:8080/function/test' \
--header 'Content-Type: application/json' \
--data-raw '{
	"code": 1
}'` - It will return a 504 HTTP code as expected

5 - Make a request that will execute a non-infinite loop on the function: `curl --location --request GET 'http://127.0.0.1:8080/function/test' \
--header 'Content-Type: application/json' \
--data-raw '{
	"code": 2
}'` - It will not work properly and will return a 504 HTTP error code

Note: It seems that the node thread is blocked since the step 4 and the function will no longer work until a redeploy is made
