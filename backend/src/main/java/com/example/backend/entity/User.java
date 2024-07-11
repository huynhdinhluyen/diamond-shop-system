package com.example.backend.entity;

import com.example.backend.enums.RoleName;
import com.example.backend.enums.UserVerifyStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "\"user\"", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "phone_number")
})
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false, length = 24)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "phone_number", length = 10)
    private String phoneNumber;

    @Nationalized
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Nationalized
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Nationalized
    @Column(name = "address")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private RoleName roleName = RoleName.CUSTOMER;

    @Column(name = "verification_code", columnDefinition = "VARCHAR(MAX)")
    private String verificationCode;

    @Column(name = "access_token", length = 1000)
    private String accessToken;

    @Column(name = "refresh_token", length = 1000)
    private String refreshToken;

    @Column(name = "reset_password_token", length = 1000)
    private String resetPasswordToken;

    @Column(name = "points", nullable = false, columnDefinition = "int default 0")
    private Integer points = 0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "membership_level_id")
    private MembershipLevel membershipLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 25)
    private UserVerifyStatus accountStatus = UserVerifyStatus.Unverified;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(roleName.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}