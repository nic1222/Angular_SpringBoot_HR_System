package com.fyp.hrw.repo;

import com.fyp.hrw.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IUserRepo extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);

    @Modifying
    @Query("UPDATE User u SET u.name=?2 , u.gender=?3 , u.email=?4 , u.phone=?5 , u.ic=?6 , u.address=?7 WHERE u.username=?1")
    void updateUserWithoutPassword(String username, String name, String gender, String email, String phone, String ic, String address);

    void deleteUserByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
