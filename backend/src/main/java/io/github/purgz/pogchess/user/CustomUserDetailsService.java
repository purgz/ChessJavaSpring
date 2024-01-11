package io.github.purgz.pogchess.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{

        User user = userRepository.findByEmail(username);
        System.out.println(user);
        if (user == null){
            throw new UsernameNotFoundException("User not found with email " + username);
        }

        Collection<GrantedAuthority> authorities = new HashSet<>();

        for (Role role : user.getRoles()){
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
            authorities.add(authority);
        }

        return new CustomUserDetails(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                authorities);
    }
}
