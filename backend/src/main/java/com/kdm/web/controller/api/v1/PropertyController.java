package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

import java.util.Locale;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.apache.commons.lang3.ObjectUtils;
import org.assertj.core.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Property;
import com.kdm.web.service.LoanService;
import com.kdm.web.util.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping(ApiConstants.PROPERTY_MAPPING)
public class PropertyController {
	
	Logger logger = LoggerFactory.getLogger(PropertyController.class);
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private PropertyRepository propertyRepository;
	
	@Autowired
	private LoanService loanService;
	
	@Operation(
		summary = "Get list of proeprties according to search criteria and pagination options", 
		tags = "property",
		parameters = { 
			@Parameter(
				name = "size",
				description = "amount of records per page",
				schema = @Schema(
					type = "int"
				),
				required = false
			),
			@Parameter(
				name = "page",
				description = "page number to get",
				schema = @Schema(
					type = "int"
				),
				required = false
			),
			@Parameter(
				name = "sort",
				description = "sort criteria, can have multiple values",
				schema = @Schema(
					type = "string"
				),
				required = false
			)},
		responses = {
			@ApiResponse(
				responseCode = "200", 
				description = "pagination response with content of properties matching to search criteria", 
				content = @Content(
					schema = @Schema(implementation = Page.class)
				)
			)
		}
	)
	@ResponseBody
	@GetMapping
	public ResponseEntity<Page<Property>> getProperties(
			/*@Parameter(hidden = true) PropertySpec propertySpec,*/ 
			@PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
		
		// commented spec because at the moment we haven't defined which fields to use for search
		Page<Property> page = propertyRepository.findAll(/*propertySpec,*/ pageable); 
		return new ResponseEntity<Page<Property>>(page, OK);
	}
	

	@Operation(summary = "Get information of a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property information"),
			@ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{propertyId}")
	public ResponseEntity<Property> getProperty(@PathVariable("propertyId") Long propertyId) throws Exception {

		if (ObjectUtils.isEmpty(propertyId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.invalid_id", Arrays.array(propertyId), Locale.US));
		}
		
		Optional<Property> property = propertyRepository.findById(propertyId);
		if (property.isPresent()) {
			return new ResponseEntity<Property>(property.get(), OK);
		} else {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(propertyId), Locale.US));
		}
	}
	
	@Operation(summary = "Create a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = {"/",""}, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Property> saveProperty(@RequestBody @Valid Property property, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}

		Property newProperty = loanService.createProperty(property);
		
		return new ResponseEntity<Property>(newProperty, OK);
	}
	
	@Operation(summary = "Update a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{propertyId}")
	@Transactional
	public ResponseEntity<Property> updateProperty(@PathVariable("propertyId") Long propertyId, @RequestBody @Valid Property property, BindingResult bindingResult) throws BindException {
		
		if (property.getId() != propertyId) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.id_not_match", Arrays.array(propertyId, property.getId()), Locale.US));
		}
		
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		
		Optional<Property> prevProperty = propertyRepository.findById(propertyId);
		if (!prevProperty.isPresent()) {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(propertyId), Locale.US));
		}
		
		Property updatedProperty = loanService.updateProperty(property);
		
		return new ResponseEntity<Property>(updatedProperty, OK);
	}
	
	@Operation(summary = "Delete a property", tags = "property", responses = {
			@ApiResponse(responseCode = "200", description = "property deleated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{propertyId}")
	public ResponseEntity<Void> deleteProperty(@PathVariable("propertyId") Long propertyId) {
		if (ObjectUtils.isEmpty(propertyId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.bad_request", Arrays.array("propertyId is invalid"), Locale.US));
		}
		
		Optional<Property> property = propertyRepository.findById(propertyId);
		if (!property.isPresent()) {
			throw new ResponseStatusException(NOT_FOUND,
					messageSource.getMessage("controller.entity_no_exists", Arrays.array(propertyId), Locale.US));
		} 
		
		propertyRepository.delete(property.get());
		
		return new ResponseEntity<Void>(OK);
	}

}
