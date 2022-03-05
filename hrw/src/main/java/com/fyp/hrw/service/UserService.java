package com.fyp.hrw.service;

import com.fyp.hrw.exception.UserNotFoundException;
import com.fyp.hrw.model.User;
import com.fyp.hrw.repo.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class UserService {
    private final IUserRepo iUserRepo;

    @Autowired
    public UserService(IUserRepo iUserRepo) {
        this.iUserRepo = iUserRepo;
    }

    public User addUser(User user) {
        return iUserRepo.save(user);
    }

    public List<User> findAllUser() {
        return iUserRepo.findAll();
    }

    public User updateUser(User user) {
        return iUserRepo.save(user);
    }

    public void updateUserWithoutPassword(User user) {
        iUserRepo.updateUserWithoutPassword(user.getUsername(), user.getName(), user.getGender(), user.getEmail(), user.getPhone(), user.getIc(), user.getAddress());
    }

    public User findUserByUsername(String username) {
        return iUserRepo.findUserByUsername(username).orElseThrow(() -> new UserNotFoundException("User Not Found"));
    }

    public void deleteEmployeeByUsername(String username) {
        iUserRepo.deleteUserByUsername(username);
    }
}
