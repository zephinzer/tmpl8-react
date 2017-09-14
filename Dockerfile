FROM centos:centos7
WORKDIR /app
RUN yum -y update
RUN yum -y install gcc gcc-c++ wget
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
RUN yum -y install nodejs yarn
COPY . /app