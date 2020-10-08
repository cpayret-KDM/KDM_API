package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.OK;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.kdm.web.model.Property;
import com.kdm.web.util.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping(ApiConstants.PROPERTY_MAPPING)
public class PropertyController {

	@Operation(summary = "Get information of a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property information"),
			@ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@RequestMapping(path = "/{propertyId}", method = RequestMethod.GET)
	public ResponseEntity<Property> getCustomer(@PathVariable("propertyId") String propertyId) throws Exception {

		if (StringUtils.isEmpty(propertyId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					String.format("entity with key %s, do not exists", propertyId));
		}

		if (propertyId.equalsIgnoreCase("0")) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					String.format("entity with key %s, do not exists", propertyId));
		}

		Property dummyProperty = new Property(propertyId, "Dummy Property Name");
		return new ResponseEntity<Property>(dummyProperty, OK);
	}

}
