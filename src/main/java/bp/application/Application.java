package bp.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@Slf4j
@SpringBootApplication
public class Application implements CommandLineRunner {


    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
        log.info("Open in browser: http://localhost:8082");
    }

    @Override
    public void run(String... args) {

    }

}
