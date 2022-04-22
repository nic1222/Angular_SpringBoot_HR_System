package com.fyp.hrw;

import com.fyp.hrw.exception.RecordNotFoundException;
import com.fyp.hrw.model.EGender;
import com.fyp.hrw.model.ERole;
import com.fyp.hrw.model.Employee;
import com.fyp.hrw.repo.EmployeeRepo;
import com.fyp.hrw.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class HrwApplication implements CommandLineRunner {

    @Autowired
    private final EmployeeRepo employeeRepo;

    @Autowired
    private final PasswordEncoder encoder;

    @Resource
    FileUploadService fileUploadService;

    public HrwApplication(EmployeeRepo employeeRepo, PasswordEncoder encoder) {
        this.employeeRepo = employeeRepo;
        this.encoder = encoder;
    }

    public static void main(String[] args) {
        SpringApplication.run(HrwApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        //add testing user
//        for (int i = 0; i < 10; i++) {
//            String initialAdminPassword = encoder.encode("1234");
//            Employee emp = new Employee();
//            emp.setUsername("user" + i);
//            emp.setName("Name" + i);
//            emp.setEmail("user" + i + "@gmail.com");
//            emp.setGender(EGender.FEMALE);
//            emp.setPassword(initialAdminPassword);
//            emp.setRole(ERole.ROLE_EMP);
//            emp.setPhone("0123456789");
//            emp.setIc("010110101010");
//            emp.setAddress("Address " + i);
//            employeeRepo.save(emp);
//        }

        //create upload file
//        fileUploadService.init();

        //create HR acc
//        String initialAdminPassword = encoder.encode("1234");
//        Employee emp = new Employee();
//        emp.setUsername("nicnic");
//        emp.setName("Nicholas");
//        emp.setEmail("nicholas9755@gmail.com");
//        emp.setGender(EGender.MALE);
//        emp.setPassword(initialAdminPassword);
//        emp.setRole(ERole.ROLE_HR);
//        emp.setPhone("0146683896");
//        emp.setIc("001222100213");
//        emp.setAddress("No37, Jalan sas, 57200, KL");
//        employeeRepo.save(emp);

    }


}
