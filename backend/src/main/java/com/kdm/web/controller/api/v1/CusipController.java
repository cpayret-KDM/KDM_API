package com.kdm.web.controller.api.v1;

import com.kdm.web.data.repository.AppraisalRepository;
import com.kdm.web.data.repository.CusipRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.*;
import com.kdm.web.model.util.Note;
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

import java.time.ZonedDateTime;
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
            @ApiResponse(responseCode = "200", description = "CUSIP created"),
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
            @ApiResponse(responseCode = "200", description = "CUSIP created"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "CUSIP not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
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
        return new ResponseEntity<>(updatedCusip, OK);
    }


    @Operation(summary = "Delete a CUSIP", tags = "cusip", responses = {
            @ApiResponse(responseCode = "200", description = "CUSIP deleted"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "CUSIP not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
    )
    @ResponseBody
    @DeleteMapping(path = "/{cusipId}")
    public ResponseEntity<Void> deleteProperty(@PathVariable("cusipId") Long cusipId) {
        Cusip cusip = entityUtil.tryGetEntity(Cusip.class, cusipId);
        cusipRepository.delete(cusip);
        return new ResponseEntity<Void>(OK);
    }

    @Operation(summary = "Assign MSN to a CUSIP", tags = "cusip", responses = {
            @ApiResponse(responseCode = "200", description = "MSN assigned"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "CUSIP or MSN not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
    )
    @ResponseBody
    @PutMapping(path = "/{cusipId}/msn/{msnId}")
    public ResponseEntity<Loan> assignMsn(@PathVariable("cusipId") Long cusipId, @PathVariable("msnId") Long msnId) {
        Cusip cusip = entityUtil.tryGetEntity(Cusip.class, cusipId);
        MSN msn = entityUtil.tryGetEntity(MSN.class, msnId);

        // TODO: the assign stuff

        return null;
    }

    @Operation(summary = "Remove MSN from a CUSIP", tags = "cusip", responses = {
            @ApiResponse(responseCode = "200", description = "MSN removed"),
            @ApiResponse(responseCode = "400", description = "bad or insufficient information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "CUSIP or MSN not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) }
    )
    @ResponseBody
    @DeleteMapping(path = "/{cusipId}/msn/{msnId}")
    public ResponseEntity<Loan> removeMsn(@PathVariable("cusipId") Long cusipId, @PathVariable("msnId") Long msnId) {
        Cusip cusip = entityUtil.tryGetEntity(Cusip.class, cusipId);
        MSN msn = entityUtil.tryGetEntity(MSN.class, msnId);

        // TODO: the unassign stuff

        return null;
    }

}
