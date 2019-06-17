docker build -t brandonwade/multi-client:latest -t brandonwade/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t brandonwade/multi-server:latest -t brandonwade/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t brandonwade/multi-worker:latest -t brandonwade/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push brandonwade/multi-client:latest
docker push brandonwade/multi-client:$SHA
docker push brandonwade/multi-server:latest
docker push brandonwade/multi-server:$SHA
docker push brandonwade/multi-worker:latest
docker push brandonwade/multi-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/client-deployment client=brandonwade/multi-client:$SHA
kubectl set image deployments/server-deployment server=brandonwade/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=brandonwade/multi-worker:$SHA
