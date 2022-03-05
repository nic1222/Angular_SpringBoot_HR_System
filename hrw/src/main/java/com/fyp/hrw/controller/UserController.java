package com.fyp.hrw.controller;

import com.fyp.hrw.model.User;
import com.fyp.hrw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    PasswordEncoder encoder;

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.findAllUser();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        User user = userService.findUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User cuser = userService.findUserByUsername(user.getUsername());
        System.out.println("Current->" + cuser.getPassword());
        System.out.println("To update->" + user.getPassword());
        User updateUser = new User();
        if (!user.getPassword().isEmpty()) {
            String encodePassword = encoder.encode(user.getPassword());
            user.setPassword(encodePassword);
            updateUser = userService.updateUser(user);
        }else {
           userService.updateUserWithoutPassword(user);
        }

        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<User> deleteEmployee(@PathVariable("username") String username) {
        userService.deleteEmployeeByUsername(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
