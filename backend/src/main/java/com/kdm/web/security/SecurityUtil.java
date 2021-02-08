package com.kdm.web.security;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class SecurityUtil {
	
	private static Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

	public static String getSystemOrLoggedInUserName() {
		String userName = SecurityUtil.getLoggedInUserName();
		if (StringUtils.isBlank(userName)) {
			userName = "SYSTEM";
		}
		return userName;
	}
	
	private static String getLoggedInUserName() {
		String userName = null;
		Authentication auth = getAuthentication();
		
		if (auth != null && (auth instanceof JwtAuthenticationToken)) {
			Object o = auth.getPrincipal();
			try {
				@SuppressWarnings("unchecked")
				Map<String, Object> claims = (Map<String, Object>) BeanUtils.findMethod(o.getClass(), "getClaims", null).invoke(o, new Object[] {});
				userName = claims.get("nickname").toString();
			} catch (Throwable t) {
				String msg = "Unable to get the username property from the security context's user details object.  Object trying to get properties from is: " + o.getClass().getName();
				logger.error(msg, t);
			}
		}
		
		return userName;
	}
	
	private static Authentication getAuthentication() {
		return SecurityContextHolder.getContext().getAuthentication();
	}
}
