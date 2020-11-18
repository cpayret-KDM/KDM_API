FROM maven:3.6.3-openjdk-8 as maven_build

COPY pom.xml /build/
COPY src /build/src/

WORKDIR /build/
RUN mvn package


FROM openjdk:8-jdk-alpine
VOLUME /tmp

ARG VERSION

LABEL version=${VERSION}
LABEL description="KDE API - Spring Boot Application"
LABEL vendor="KDE"

EXPOSE 8080

ENV JAVA_OPTS ""

COPY --from=maven_build /build/target/kdm_api-0.0.1-SNAPSHOT.jar /kdm.jar

ENTRYPOINT java ${JAVA_OPTS} -jar /kdm.jar