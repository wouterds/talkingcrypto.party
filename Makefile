all: tag

VERSION = 0.0.1
PWD = $(shell pwd)

DOCKER_REPO  = docker.wouterdeschuyter.be
PROJECT_NAME = internal-talkingcrypto-website

TAG_NGINX = $(DOCKER_REPO)/$(PROJECT_NAME)-nginx

DOCKERFILE_NGINX = ./docker/nginx/Dockerfile

clean:
	-rm -f .build-*

.build-nginx: $(DOCKERFILE_NGINX)
	docker build $(BUILD_NO_CACHE) -f $(DOCKERFILE_NGINX) -t $(TAG_NGINX) .
	touch .build-nginx

build: .build-nginx

tag: build
	docker tag $(TAG_NGINX) $(TAG_NGINX):$(VERSION)


push: tag
	docker push $(TAG_NGINX):$(VERSION)

push-latest: push
	docker push $(TAG_NGINX):latest
