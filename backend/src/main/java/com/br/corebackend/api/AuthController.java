package com.br.corebackend.api;

import lombok.RequiredArgsConstructor;
import jakarta.validation.ValidationException;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.i18n.LocaleContextHolder;

import com.br.corebackend.dto.ChangePasswordRequestDTO;
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
    private final MessageSource messageSource;

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
        } else {
            String message = messageSource.getMessage(
                    "auth.register.email.already.registered",
                    null,
                    LocaleContextHolder.getLocale()
            );
            return ResponseEntity.badRequest().body(message);
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequestDTO body) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User authenticatedUser)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = this.userRepository.findByUsername(authenticatedUser.getUsername())
                .orElseThrow(() -> new ValidationException("user.not.found"));

        if (body.currentPassword() == null || body.currentPassword().isBlank()) {
            throw new ValidationException("auth.change.password.current.required");
        }

        if (body.newPassword() == null || body.newPassword().isBlank() || body.confirmNewPassword() == null || body.confirmNewPassword().isBlank()) {
            throw new ValidationException("auth.change.password.new.required");
        }

        if (!this.passwordEncoder.matches(body.currentPassword(), user.getPassword())) {
            throw new ValidationException("auth.change.password.current.invalid");
        }

        if (!body.newPassword().equals(body.confirmNewPassword())) {
            throw new ValidationException("auth.change.password.confirm.mismatch");
        }

        if (body.newPassword().length() < 8) {
            throw new ValidationException("auth.change.password.new.min.length");
        }

        user.setPassword(this.passwordEncoder.encode(body.newPassword()));
        this.userRepository.save(user);

        String message = this.messageSource.getMessage(
                "auth.change.password.success",
                null,
                LocaleContextHolder.getLocale()
        );
        return ResponseEntity.ok(message);
    }

}
