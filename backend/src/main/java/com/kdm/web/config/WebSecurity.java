package com.kdm.web.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.util.StringUtils;

import com.kdm.web.controller.CustomAccessDeniedHandler;
import com.kdm.web.controller.CustomHttp403ForbiddenEntryPoint;

@Configuration
@EnableGlobalMethodSecurity(
		  prePostEnabled = true, 
		  securedEnabled = true, 
		  jsr250Enabled = true)
@Profile("!no_kdm_security")
public class WebSecurity extends WebSecurityConfigurerAdapter {
	
	@Value("${auth0.claimPrefix}")
	private String claimPrefix;
	
	@Value("${auth0.audience}")
    private String audience;
	
	@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests()
			.antMatchers("/").permitAll()
			.anyRequest().authenticated()
			.and().cors()
			.and().oauth2ResourceServer().jwt()
			.jwtAuthenticationConverter(jwtAuthenticationConverter())
			.and().accessDeniedHandler(customAccessDeniedHandler())
			.authenticationEntryPoint(customHttp403ForbiddenEntryPoint());
	}
	
	@Bean
    JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
                JwtDecoders.fromOidcIssuerLocation(issuer);

        //OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer);

        jwtDecoder.setJwtValidator(withAudience);
        //jwtDecoder.setJwtValidator(withIssuer);

        return jwtDecoder;
    }
	
	JwtAuthenticationConverter jwtAuthenticationConverter() {
        CustomAuthoritiesConverter customAuthoritiesConverter = new CustomAuthoritiesConverter(claimPrefix);
        JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setJwtGrantedAuthoritiesConverter(customAuthoritiesConverter);
        return authenticationConverter;
    }
	
	@Bean
	CustomAccessDeniedHandler customAccessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}
	
	@Bean
	CustomHttp403ForbiddenEntryPoint customHttp403ForbiddenEntryPoint() {
		return new CustomHttp403ForbiddenEntryPoint();
	}
	
	class CustomAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
		
		private Map<String, String> CLAIMS_TO_AUTHORITY_PREFIX_MAP = new HashMap<String, String>();
        
		public CustomAuthoritiesConverter(String claimPrefix) {
			this.CLAIMS_TO_AUTHORITY_PREFIX_MAP.put(claimPrefix.concat("/roles"), "ROLE_");
			this.CLAIMS_TO_AUTHORITY_PREFIX_MAP.put(claimPrefix.concat("/groups"), "GROUP_");
			this.CLAIMS_TO_AUTHORITY_PREFIX_MAP.put(claimPrefix.concat("/permissions"), "PERMISSION_");
		}
        // extract authorities from "scope", "https://example.com/role", "https://example.com/group", and "permissions" claims.
        

        @Override
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            return CLAIMS_TO_AUTHORITY_PREFIX_MAP.entrySet().stream()
                .map(entry -> getAuthorities(jwt, entry.getKey(), entry.getValue()))
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
        }

        private Collection<GrantedAuthority> getAuthorities(Jwt jwt, String authorityClaimName, String authorityPrefix) {
            Object authorities = jwt.getClaim(authorityClaimName);
            if (authorities instanceof String) {
                if (StringUtils.hasText((String) authorities)) {
                    List<String> claims = Arrays.asList(((String) authorities).split(" "));
                    return claims.stream()
                        .map(claim -> new SimpleGrantedAuthority(authorityPrefix + claim))
                        .collect(Collectors.toList());
                } else {
                    return Collections.emptyList();
                }
            } else if (authorities instanceof Collection) {
                Collection<String> authoritiesCollection = (Collection<String>) authorities;
                Collection<GrantedAuthority> ret = authoritiesCollection.stream()
                        .map(authority -> new SimpleGrantedAuthority(authorityPrefix + authority))
                        .collect(Collectors.toList()); 
                return ret;
            }
            return Collections.emptyList();
        }
    }

}
