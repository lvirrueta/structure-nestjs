#!/bin/bash

newF=$1

nest g mo $newF

mkdir src/$newF/application
nest g cl $newF/application/dto/create-$newF.dto --flat --no-spec
nest g cl $newF/application/dto/update-$newF.dto --flat --no-spec
mkdir src/$newF/application/controller
nest g co $newF/application/controller/$newF --flat --no-spec
mkdir src/$newF/application/swagger
nest g cl $newF/application/swagger/$newF-api --flat --no-spec

mkdir src/$newF/domain
mkdir src/$newF/domain/service
nest g s $newF/domain/service/$newF --flat --no-spec
mkdir src/$newF/domain/models
nest g cl $newF/domain/models/$newF.model --flat --no-spec
mkdir src/$newF/domain/irepositories
nest g itf $newF/domain/irepositories/i-$newF.repository --flat

mkdir src/$newF/infrastructure
mkdir src/$newF/infrastructure/entities
nest g cl $newF/infrastructure/entities/$newF.entity --flat --no-spec
mkdir src/$newF/infrastructure/repositories
nest g cl $newF/infrastructure/repositories/$newF.repository --flat --no-spec
