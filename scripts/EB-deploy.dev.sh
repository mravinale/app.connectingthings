#!/usr/bin/env bash

SHA1=$1
EB_BUCKET=elasticbeanstalk-us-east-1-085850360071

# Create new Elastic Beanstalk version
DOCKERRUN_FILE=$SHA1-Dockerrun.aws.dev.json
sed "s/<TAG>/$SHA1/" < Dockerrun.aws.dev.json > $DOCKERRUN_FILE
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE --region us-east-1
aws elasticbeanstalk create-application-version --application-name connectingthings \
  --version-label $SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE --region us-east-1

# Update Elastic Beanstalk environment to new version
aws elasticbeanstalk update-environment --environment-name connectingthings-dev \
    --version-label $SHA1 --region us-east-1 --description 'from connectingthings'
