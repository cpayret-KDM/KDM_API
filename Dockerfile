FROM openjdk:8-jdk-alpine
VOLUME /tmp

ARG JAR_FILE
ARG VERSION

LABEL version=${VERSION}
LABEL description="KDE API - Spring Boot Application"
LABEL vendor="KDE"

EXPOSE 8080

ENV JAVA_OPTS ""

COPY ${JAR_FILE} /kdm.jar

ENTRYPOINT java ${JAVA_OPTS} -jar /kdm.jar