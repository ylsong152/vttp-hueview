package vttpfinalproject.hueview.service;

import vttpfinalproject.hueview.model.User;

public interface UserService{
    User registerUser(User user);
    User findByUsername(String username);
    User findByEmail(String email);
}
