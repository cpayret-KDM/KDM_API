package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

import java.time.ZonedDateTime;
import java.util.Locale;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

import com.kdm.web.data.repository.MSNRatingRepository;
import com.kdm.web.data.repository.MSNRepository;
import com.kdm.web.model.MSN;
import com.kdm.web.model.MSNRating;
import com.kdm.web.model.Rating;
import com.kdm.web.model.util.Note;
import com.kdm.web.service.EntityUtil;
import com.kdm.web.util.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@RequestMapping(ApiConstants.MSN_MAPPING)
public class MSNController {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private MSNRepository msnRepository;
	
	@Autowired
	private EntityUtil entityUtil;
	
	@Autowired
	private MSNRatingRepository msnRatingRepository;

	@Operation(
		summary = "Get list of security notes according to search criteria and pagination options", 
		tags = "msn",
		parameters = { 
			@Parameter(
				name = "number",
				schema = @Schema(
					type = "string"
				),
				required = false
			),
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
				example = "number,desc",
				schema = @Schema(
					type = "string"
				),
				required = false
			)},
		responses = {
			@ApiResponse(
				responseCode = "200", 
				description = "pagination response with content of msns matching to search criteria", 
				content = @Content(
					schema = @Schema(implementation = Page.class)
				)
			)
		}
	)
	@ResponseBody
	@GetMapping
	public ResponseEntity<Page<MSN>> getMSN(
			@Parameter(hidden = true) MSNSpec msnSpec, 
			@PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
		
		Page<MSN> page = msnRepository.findAll(msnSpec, pageable); 
		return new ResponseEntity<Page<MSN>>(page, OK);
	}
	
	@Operation(summary = "Get information of a msn", tags = "msn", responses = {
			@ApiResponse(responseCode = "200", description = "msn information"),
			@ApiResponse(responseCode = "404", description = "msn not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{msnId}")
	public ResponseEntity<MSN> getMSN(
			@PathVariable("msnId") Long msnId) throws Exception {

		MSN msn = entityUtil.tryGetEntity(MSN.class, msnId);
		
		return new ResponseEntity<MSN>(msn, OK);
	}
	
	@Operation(summary = "Create a MSN", tags = "msn", responses = {
			@ApiResponse(responseCode = "200", description = "msn created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = {"/",""}, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MSN> saveMSN(@RequestBody @Valid MSN msn, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		MSN newMSN = msnRepository.saveAndFlush(msn);
		
		return new ResponseEntity<MSN>(newMSN, OK);
	}
	
	@Operation(summary = "updates a msn", tags = "msn", responses = {
			@ApiResponse(responseCode = "200", description = "msn updated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "msn not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	
	@ResponseBody
	@PutMapping(path = "/{msnId}")
	@Transactional
	public ResponseEntity<MSN> updateMSN(@PathVariable("msnId") Long msnId, @RequestBody @Valid MSN msn, BindingResult bindingResult) throws BindException {
		
		if (msn.getId() != msnId) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.id_not_match", Arrays.array(msnId, msn.getId()), Locale.US));
		}
		
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		
		// do this just to make sure it exist
		MSN prevmsn = entityUtil.tryGetEntity(MSN.class, msnId);
		
		// merge will update the entity give by its id
		MSN updatedMSN = entityManager.merge(msn);
		
		return new ResponseEntity<MSN>(updatedMSN, OK);
	}
	
	@Operation(summary = "assign a rating to a msn", tags = "msn", responses = {
			@ApiResponse(responseCode = "200", description = "rating assigned"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "msn or rating not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{msnId}/rating/{ratingId}")
	public ResponseEntity<MSN> assignRating(@PathVariable("msnId") Long msnId, @PathVariable("ratingId") Long ratingId, @RequestBody @Valid Note note, BindingResult bindingResult) throws Exception {
		MSN msn = entityUtil.tryGetEntity(MSN.class, msnId);
		entityManager.detach(msn);
		
		Rating rating = entityUtil.tryGetEntity(Rating.class, ratingId);
		
		MSNRating msnRtng = MSNRating.builder()
				.msn(msn)
				.msnId(msnId)
				.rating(rating)
				.ratingId(ratingId)
				.note(note.toString())
				.date(ZonedDateTime.now())
				.build();
		
		
		msnRtng = msnRatingRepository.saveAndFlush(msnRtng);

		return this.getMSN(msnId);
	}
	
	@Operation(summary = "delete a msn", tags = "msn", responses = {
			@ApiResponse(responseCode = "200", description = "msn deleted"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "msn not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{msnId}")
	public ResponseEntity<Void> deleteMSN(@PathVariable("msnId") Long msnId) {
		MSN msn = entityUtil.tryGetEntity(MSN.class, msnId);
		
		msnRepository.delete(msn);
		
		return new ResponseEntity<Void>(OK);
	}
}

@And({
	@Spec(path = "number", spec = Like.class)
})
interface MSNSpec extends Specification<MSN> {
}