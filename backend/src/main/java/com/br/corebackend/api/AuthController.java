package com.br.corebackend.api;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.br.corebackend.dto.LoginRequestDTO;
import com.br.corebackend.dto.LoginResponseDTO;
import com.br.corebackend.dto.RegisterRequestDTO;
import com.br.corebackend.model.User;
import com.br.corebackend.repository.UserRepository;
import com.br.corebackend.security.TokenService;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO body) {
        Optional<User> user = this.userRepository.findByUsername(body.username());
        if(user.isPresent() && passwordEncoder.matches(body.password(), user.get().getPassword())) {
            String token = tokenService.generateToken(user.get());
            LoginResponseDTO response = new LoginResponseDTO(user.get().getUsername(), token);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = this.userRepository.findByUsername(body.username());
        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setUsername(body.username());
            newUser.setPassword(passwordEncoder.encode(body.password()));
            userRepository.save(newUser);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
