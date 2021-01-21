package com.kdm.web.controller.api.v1;

import com.kdm.web.data.repository.AppraisalRepository;
import com.kdm.web.data.repository.CusipRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Cusip;
import com.kdm.web.model.Loan;
import com.kdm.web.service.EntityUtil;
import com.kdm.web.service.LoanService;
import com.kdm.web.util.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.assertj.core.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.validation.Valid;

import java.util.Locale;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping(ApiConstants.CUSIP_MAPPING)
public class CusipController {

    Logger logger = LoggerFactory.getLogger(CusipController.class);

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private EntityUtil entityUtil;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private CusipRepository cusipRepository;

    @Operation(summary = "Get information of a CUSIP", tags = "cusip", responses = {
            @ApiResponse(responseCode = "200", description = "cusip information"),
            @ApiResponse(responseCode = "404", description = "cusip not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @ResponseBody
    @GetMapping(path = "/{cusipId}")
    public ResponseEntity<Cusip> getCusip(@PathVariable("cusipId") Long cusipId) {
        Cusip cusip = entityUtil.tryGetEntity(Cusip.class, cusipId);
        return new ResponseEntity<>(cusip, OK);
    }

    @Operation(summary = "Create a CUSIP", tags = "cusip", responses = {
            @ApiResponse(responseCode = "200", description = "cusip created"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @ResponseBody
    @PostMapping(path = {"/",""}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cusip> saveCusip(@RequestBody @Valid Cusip cusip, BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        Cusip newCusip = cusipRepository.saveAndFlush(cusip);
        return new ResponseEntity<>(newCusip, OK);
    }

    @Operation(summary = "Update a CUSIP", tags = "cusip", responses = {
            @ApiResponse(responseCode = "200", description = "cusip created"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "cusip not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
    )
    @ResponseBody
    @PutMapping(path = "/{cusipId}")
    @Transactional
    public ResponseEntity<Cusip> updateCusip(@PathVariable("cusipId") Long cusipId, @RequestBody @Valid Cusip cusip, BindingResult bindingResult) throws BindException {
        if (cusip.getId() != cusipId) {
            throw new ResponseStatusException(BAD_REQUEST,
                    messageSource.getMessage("controller.id_not_match", Arrays.array(cusipId, cusip.getId()), Locale.US));
        }
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        Cusip updatedCusip = entityManager.merge(cusip);
        return new ResponseEntity<Cusip>(updatedCusip, OK);
    }

    /*
    @Operation(summary = "Delete a property", tags = "property", responses = {
            @ApiResponse(responseCode = "200", description = "property deleated"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
    )
    @ResponseBody
    @DeleteMapping(path = "/{propertyId}")
    public ResponseEntity<Void> deleteProperty(@PathVariable("propertyId") Long propertyId) {
        Property property = entityUtil.tryGetEntity(Property.class, propertyId);

        propertyRepository.delete(property);

        return new ResponseEntity<Void>(OK);
    }

    @Operation(summary = "assign a appraisal to a property", tags = "property", responses = {
            @ApiResponse(responseCode = "200", description = "appraisal assigned"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "property not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
    )
    @ResponseBody
    @PutMapping(path = "/{propertyId}/appraisal")
    @Transactional
    public ResponseEntity<Property> changeAppraisal(@PathVariable("propertyId") Long propertyId, @RequestBody @Valid LatestAppraisalView appraisalParam, BindingResult bindingResult) throws BindException {
        Property property = entityUtil.tryGetEntity(Property.class, propertyId);

        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        Appraisal newAppraisal = Appraisal.builder()
                .note(appraisalParam.getNote())
                .value(appraisalParam.getValue())
                .property(property)
                .build();

        appraisalRepository.saveAndFlush(newAppraisal);

        entityManager.detach(property);

        Property updatedProperty = entityUtil.tryGetEntity(Property.class, propertyId);

        return new ResponseEntity<Property>(updatedProperty, OK);
    }
    */

}
