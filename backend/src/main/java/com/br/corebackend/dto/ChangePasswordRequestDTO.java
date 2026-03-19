package com.br.corebackend.dto;

public record ChangePasswordRequestDTO(
        String currentPassword,
        String newPassword,
        String confirmNewPassword
) {
}

