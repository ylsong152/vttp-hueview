FROM openjdk:21-jdk-slim AS builder
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

ENV PORT=8080
ENV SPRING_DATASOURCE_URL=jdbc:mysql://monorail.proxy.rlwy.net:55736/railway
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=avlXPSzErNmyCRnMbiPpUHyoxCaCynCG
ENV SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.MySQLDialect

EXPOSE ${PORT}
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]