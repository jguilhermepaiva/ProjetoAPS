package api.aps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient
public class AplicationStart {

    public static void main(String[] args) {

        SpringApplication.run(AplicationStart.class, args);
    }
}
