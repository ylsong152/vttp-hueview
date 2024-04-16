package vttpfinalproject.hueview.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vttpfinalproject.hueview.model.LoginRequest;
import vttpfinalproject.hueview.model.LoginResponse;
import vttpfinalproject.hueview.model.User;
import vttpfinalproject.hueview.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    System.out.println("THIS IS EXECUTED");
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String token = generateToken(authentication);
    
    User user = userService.findByUsername(loginRequest.getUsername());
    
    LoginResponse loginResponse = new LoginResponse(token, user);
    
    System.out.println("THIS IS EXECUTED");
    return ResponseEntity.ok(loginResponse);
}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("register is called");
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
        }

        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use!"));
        }

        User registeredUser = userService.registerUser(user);

        return ResponseEntity.ok(new MessageResponse(registeredUser.getUsername() + " registered successfully!"));
    }

    private String generateToken(Authentication authentication) {
        String token = UUID.randomUUID().toString();
        return token;
    }
    
    @GetMapping("/asd")
    public String asdf () {
        return "Hi dog";
    }
}



class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}