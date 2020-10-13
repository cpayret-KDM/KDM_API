package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

import javax.validation.Valid;

import org.apache.commons.lang3.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	Logger logger = LoggerFactory.getLogger(PropertyController.class);

	@Operation(summary = "Get information of a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property information"),
			@ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{propertyId}")
	public ResponseEntity<Property> getProperty(@PathVariable("propertyId") Long propertyId) throws Exception {

		if (ObjectUtils.isEmpty(propertyId)) {
			throw new ResponseStatusException(NOT_FOUND,
					String.format("entity with key %d, do not exists", propertyId));
		}
		
		//TODO: call here the repository to get a property

		Property dummyProperty = new Property();
		dummyProperty.setPropertyId(propertyId);
		dummyProperty.setName("Dummy Property Name");
		
		return new ResponseEntity<Property>(dummyProperty, OK);
	}
	
	@Operation(summary = "Create a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Property> saveProperty(@RequestBody @Valid Property property, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}


		//TODO: call here a Service or a Repo for creating a property
		
		return new ResponseEntity<Property>(property, OK);
	}
	
	@Operation(summary = "Update a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{propertyId}")
	public ResponseEntity<Property> updateProperty(@PathVariable("propertyId") Long propertyId, @RequestBody @Valid Property property) {
		
		if (property.getPropertyId() != propertyId) {
			throw new ResponseStatusException(BAD_REQUEST,
					String.format("bad request id %d do not match %d", propertyId, property.getPropertyId()));
		}
		//TODO: call here a Service or a Repo for updating a property
		
		//original = repo.findOne(propertyId);
		// if null
		//    throw new ResponseStatusException(NOT_FOUND,
		//    String.format("entity with key %d, do not exists", propertyId));
		
		// merge objects
		
		//update merged objects
		
		return new ResponseEntity<Property>(property, OK);
	}
	
	@Operation(summary = "Delete a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{propertyId}")
	public ResponseEntity<Void> deleteProperty(@PathVariable("propertyId") Long propertyId) {
		if (ObjectUtils.isEmpty(propertyId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					String.format("bad or insufficient information", propertyId));
		}
		
		// TODO: call here a Service or a Repo for updating a property
		
		//original = repo.findOne(propertyId);
		// if null
		//    throw new ResponseStatusException(NOT_FOUND,
		//    String.format("entity with key %d, do not exists", propertyId));
		
		// original.setStatus(DELETED);
		
		// repo.save(original)
		
		return new ResponseEntity<Void>(OK);
	}

}
