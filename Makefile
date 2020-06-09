#!make

REPO=radyak
IMAGE=shnippit


default: deploy

package:
	mvn clean install -DskipTests

build: package
	docker build -t $(REPO)/$(IMAGE):latest .

deploy: build
	docker tag  $(REPO)/$(IMAGE):latest $(REPO)/$(IMAGE):latest
	docker push $(REPO)/$(IMAGE):latest


## run

run.dev.backend:
	cd backend; mvn spring-boot:run

run.dev.frontend:
	cd frontend; npm start

run: build
	docker run -p 8080:8080 -v ./test-data:/data -e ENV=dev $(REPO)/$(IMAGE):latest
	docker run -p 8080:8080 -e ENV=dev radyak/shnippit:latest
