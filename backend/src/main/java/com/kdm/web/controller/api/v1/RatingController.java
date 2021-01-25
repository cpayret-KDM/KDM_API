package com.kdm.web.controller.api.v1;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.jpa.domain.Specification;
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

import com.kdm.web.data.repository.RatingRepository;
import com.kdm.web.model.Rating;
import com.kdm.web.model.view.RatingValueView;
import com.kdm.web.service.EntityUtil;
import com.kdm.web.util.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;

@RestController
@RequestMapping(ApiConstants.RATING_MAPPING)
public class RatingController {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private RatingRepository ratingRepository;
	
	@Autowired
	private EntityUtil entityUtil;

	@Operation(
		summary = "Get list of ratings ", 
		tags = "rating",
		responses = {
			@ApiResponse(
				responseCode = "200", 
				description = "list of agency ratings, each ", 
				content = @Content(
					schema = @Schema(
						type = "object",
						example = "{\n" + 
								"  \"EJ\": [\n" + 
								"    {\n" + 
								"      \"id\": 1,\n" + 
								"      \"value\": \"A+\"\n" + 
								"    },\n" + 
								"    {\n" + 
								"      \"id\": 2,\n" + 
								"      \"value\": \"A\"\n" + 
								"    }\n" + 
								"  ],\n" + 
								"  \"JPMorgan\": [\n" + 
								"    {\n" + 
								"      \"id\": 4,\n" + 
								"      \"value\": \"A+\"\n" + 
								"    },\n" + 
								"    {\n" + 
								"      \"id\": 5,\n" + 
								"      \"value\": \"BBB\"\n" + 
								"    }\n" + 
								"  ]\n" + 
								"}"
					)
				)
			)
		}
	)
	@ResponseBody
	@GetMapping
	public ResponseEntity<Map<String, List<RatingValueView>>> getRatings() {

		List<Rating> ratings = ratingRepository.findAll();
		
		Map<String, List<RatingValueView>> results = ratings.stream()
			.collect(
				Collectors.groupingBy(Rating::getAgency,
						Collectors.mapping( r -> createRatingValueView(r) ,
								Collectors.toList())));

		return new ResponseEntity<Map<String, List<RatingValueView>>>(results, OK);

	}
	
	private RatingValueView createRatingValueView(Rating rating) {
	    return RatingValueView.builder()
	    		.id(rating.getId())
	    		.value(rating.getRating())
	    		.build();
	}
	
	@Operation(summary = "Get information of a rating", tags = "rating", responses = {
			@ApiResponse(responseCode = "200", description = "rating information"),
			@ApiResponse(responseCode = "404", description = "rating not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@GetMapping(path = "/{ratingId}")
	public ResponseEntity<Rating> getRating(
			@PathVariable("ratingId") Long ratingId) throws Exception {

		Rating rating = entityUtil.tryGetEntity(Rating.class, ratingId);
		
		return new ResponseEntity<Rating>(rating, OK);
	}
	
	@Operation(summary = "Create a rating", tags = "rating", responses = {
			@ApiResponse(responseCode = "200", description = "rating created"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
	@ResponseBody
	@PostMapping(path = {"/",""}, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Rating> saveRating(@RequestBody @Valid Rating rating, BindingResult bindingResult) throws BindException {
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		Rating newRating = ratingRepository.saveAndFlush(rating);
		
		return new ResponseEntity<Rating>(newRating, OK);
	}
	
	@Operation(summary = "updates a rating", tags = "rating", responses = {
			@ApiResponse(responseCode = "200", description = "rating updated"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "rating not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@PutMapping(path = "/{ratingId}")
	@Transactional
	public ResponseEntity<Rating> updateRating(@PathVariable("ratingId") Long ratingId, @RequestBody @Valid Rating rating, BindingResult bindingResult) throws BindException {
		
		if (!rating.getId().equals(ratingId)) {
			throw new ResponseStatusException(BAD_REQUEST,
					messageSource.getMessage("controller.id_not_match", Arrays.array(ratingId, rating.getId()), Locale.US));
		}
		
		if (bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		
		// do this just to make sure it exist
		Rating prevRating = entityUtil.tryGetEntity(Rating.class, ratingId);
		
		rating.setLoanRatings(prevRating.getLoanRatings());
		// merge will update the entity give by its id
		Rating updatedRating = entityManager.merge(rating);
		
		return new ResponseEntity<Rating>(updatedRating, OK);
	}
	
	@Operation(summary = "delete a rating", tags = "rating", responses = {
			@ApiResponse(responseCode = "200", description = "rating deleted"),
			@ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
			@ApiResponse(responseCode = "404", description = "rating not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
	)
	@ResponseBody
	@DeleteMapping(path = "/{ratingId}")
	public ResponseEntity<Void> deleteRating(@PathVariable("ratingId") Long ratingId) {
		Rating rating = entityUtil.tryGetEntity(Rating.class, ratingId);
		
		ratingRepository.delete(rating);
		
		return new ResponseEntity<Void>(OK);
	}
	
}

@Spec(path = "agency", spec = Like.class)
interface RatingSpec extends Specification<Rating> {
}
