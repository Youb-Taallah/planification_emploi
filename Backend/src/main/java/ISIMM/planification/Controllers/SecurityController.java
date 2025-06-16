package ISIMM.planification.Controllers;

import  ISIMM.planification.Security.dto.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ISIMM.planification.Security.CustomUserDetailsService;
import ISIMM.planification.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ISIMM.planification.Enteties.User;
import ISIMM.planification.Repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class SecurityController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            // Return unauthorized if invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }

        // Load user details
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(request.getUsername());

        // Generate JWT Access token
        final String accesToken = jwtUtil.generateAccesToken(userDetails);

        // Generate JWT Refresh token
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        Optional<User> userOptional = UserRepository.findByUsername(request.getUsername());
        String role = null;

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            role = user.getRole();
        }

        // Return the JWT in the response
        return ResponseEntity.ok(new AuthResponse(accesToken, refreshToken, role));
    }

    // New register method
    @PostMapping("/register-student")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByUsername(registerRequest.getUsername());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username is already taken");
        }
        User newUser = new User();        // Create a new User entity and set the password (hashed) and username


        // Hash the password before storing it in the database
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());

        newUser.setPassword(hashedPassword);
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setRole("STUDENT");
        // Set other properties like roles, if needed

        // Save the user to the database
        userRepository.save(newUser);

        // Return success message or created status
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully");
    }

    @PostMapping("/register-professor")
    public ResponseEntity<?> register2(@RequestBody RegisterRequest registerRequest) {
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByUsername(registerRequest.getUsername());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username is already taken");
        }
        // Create a new User entity and set the password (hashed) and username
        User newUser = new User();

        // Hash the password before storing it in the database
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());

        newUser.setPassword(hashedPassword);
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setRole("PROFESSOR");
        // Set other properties like roles, if needed

        // Save the user to the database
        userRepository.save(newUser);

        // Return success message or created status
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully");
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequest refreshRequest) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwtUtil.extractUsername(refreshRequest.getRefreshToken()));

        // Validate the refresh token
        if (userDetails!=null && jwtUtil.validateToken(refreshRequest.getRefreshToken(),userDetails)) {

            String username = jwtUtil.extractUsername(refreshRequest.getRefreshToken());
            String newAccessToken = jwtUtil.generateAccesToken(userDetails);

            return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshRequest.getRefreshToken(),null));

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestBody ValidateRequest validateRequest) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwtUtil.extractUsername(validateRequest.getAccessToken()));

        if (userDetails != null && jwtUtil.validateToken(validateRequest.getAccessToken(), userDetails)) {

            String username = userDetails.getUsername();

            Optional<User> existingUser = userRepository.findByUsername(username);

            if (existingUser.isPresent()) {
                return ResponseEntity.ok(existingUser);
            }
            else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    }

    @PostMapping("/get-user-details")
    public ResponseEntity<?> userDetailsFromToken(@RequestBody ValidateRequest validateRequest) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwtUtil.extractUsername(validateRequest.getAccessToken()));

        if (userDetails != null && jwtUtil.validateToken(validateRequest.getAccessToken(), userDetails)) {
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");

    }

}