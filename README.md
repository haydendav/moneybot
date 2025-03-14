# moneybot

This is a personal app to track my money and make some data visualizations out of it. The frontend is hosted statically with plain html, css, and javascript. The backend is a spring boot MVC app with a postgres database. 

# running app

The database must be connected but this is how to start the application. Included mvnw and mvnw.cmd if needed to run.  

**With mvn already installed:**  
`mvn clean install` --clean and compile  
`mvn spring-boot:run` --runs project  

**Without mvn:**  
macOS/Linux:  
`./mvnw clean install`  
`./mvnw spring-boot:run`

Windows:  
`mvnw.cmd clean install`  
`mvnw.cmd spring-boot:run`