package com.kdm.web.controller.api.v1;

import com.kdm.web.data.repository.CusipRepository;
import com.kdm.web.data.repository.MSNRepository;
import com.kdm.web.model.Cusip;
import com.kdm.web.model.MSN;
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
import org.assertj.core.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
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
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

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

    @Autowired
    private MSNRepository msnRepository;

    @Operation(
            summary = "Get CUSIPs for search criteria and pagination options",
            tags = "cusip",
            parameters = {
                    @Parameter(
                            name = "class",
                            schema = @Schema(
                                    type = "string"
                            ),
                            required = false
                    ),
                    @Parameter(
                            name = "type",
                            schema = @Schema(
                                    type = "string"
                            ),
                            required = false
                    ),
                    @Parameter(
                            name = "ticker",
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
                            schema = @Schema(
                                    type = "string"
                            ),
                            required = false
                    )},
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "pagination response with content of CUSIPs matching to search criteria",
                            content = @Content(
                                    schema = @Schema(implementation = Page.class)
                            )
                    )
            }
    )
    @ResponseBody
    @GetMapping
    public ResponseEntity<Page<Cusip>> searchCusips(
            @Parameter(hidden = true) CusipSpec cusipSpec,
            @PageableDefault(size = 25) @Parameter(hidden = true) Pageable pageable) {
        Page<Cusip> page = cusipRepository.findAll(cusipSpec, pageable);
        return new ResponseEntity<>(page, OK);
    }

    @Operation(summary = "Get information of a CUSIP", tags = "cusip", responses = {
            @ApiResponse(responseCode = "200", description = "CUSIP information"),
            @ApiResponse(responseCode = "404", description = "CUSIP not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
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
    public ResponseEntity<Void> deleteCusip(@PathVariable("cusipId") Long cusipId) {
        Cusip cusip = entityUtil.tryGetEntity(Cusip.class, cusipId);
        cusipRepository.delete(cusip);
        return new ResponseEntity<>(OK);
    }

    @Operation(
            summary = "Add MSN to a CUSIP",
            tags = "workflow",
            responses = {
                    @ApiResponse(responseCode = "200", description = "MSN added to CUSIP"),
                    @ApiResponse(responseCode = "400", description = "bad request", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            })
    @ResponseBody
    @PostMapping(path = {"/{cusipId}/msn/{msnId}"})
    public ResponseEntity<Cusip> addMsnToCusip(
            @PathVariable("cusipId") Long cusipId,
            @PathVariable("msnId") Long msnId) {

        // Get CUSIP
        Optional<Cusip> cusip = cusipRepository.findById(cusipId);
        if (!cusip.isPresent()) {
            logger.debug("CUSIP ({}) not found", cusipId);
            throw new ResponseStatusException(NOT_FOUND,
                    messageSource.getMessage("controller.does_not_exist", new Object[] {cusipId}, Locale.US));
        }

        // Get MSN
        Optional<MSN> msn = msnRepository.findById(msnId);
        if (!msn.isPresent()) {
            logger.debug("MSN ({}) not found", msnId);
            throw new ResponseStatusException(NOT_FOUND,
                    messageSource.getMessage("controller.does_not_exist", new Object[] {msnId}, Locale.US));
        }

        // Make sure msn has not already been added
        if (cusip.get().getMsns().contains(msn.get())) {
            logger.debug("MSN ({}) and CUSIP ({}) are already associated", msnId, cusipId);
            throw new ResponseStatusException(
                    BAD_REQUEST,
                    messageSource.getMessage(
                            "controller.entity_already_associated", new Object[] {"MSN", msnId, "CUSIP", cusipId}, Locale.US));
        }

        Cusip cusipToUpdate = cusip.get();
        cusipToUpdate.getMsns().add(msn.get());
        cusipRepository.saveAndFlush(cusipToUpdate);
        return new ResponseEntity<>(cusipToUpdate, OK);
    }

    @Operation(
            summary = "Remove MSN from CUSIP",
            tags = "workflow",
            responses = {
                    @ApiResponse(responseCode = "200", description = "MSN removed from CUSIP"),
                    @ApiResponse(responseCode = "400", description = "bad request"),
                    @ApiResponse(responseCode = "404", description = "MSN or CUSIP not found")
            })
    @ResponseBody
    @DeleteMapping(path = {"/{cusipId}/msn/{msnId}"})
    public ResponseEntity<Cusip> removeMsnFromCusip(
            @PathVariable("cusipId") Long cusipId,
            @PathVariable("msnId") Long msnId) {

        // Get CUSIP
        Optional<Cusip> cusip = cusipRepository.findById(cusipId);
        if (!cusip.isPresent()) {
            logger.debug("CUSIP ({}) not found", cusipId);
            throw new ResponseStatusException(NOT_FOUND,
                    messageSource.getMessage("controller.does_not_exist", new Object[] {cusipId}, Locale.US));
        }

        // Get MSN
        Optional<MSN> msn = msnRepository.findById(msnId);
        if (!msn.isPresent()) {
            logger.debug("MSN ({}) not found", msnId);
            throw new ResponseStatusException(NOT_FOUND,
                    messageSource.getMessage("controller.does_not_exist", new Object[] {msnId}, Locale.US));
        }

        // Make sure task has already been added
        if (!cusip.get().getMsns().contains(msn.get())) {
            logger.debug("MSN ({}) and CUSIP ({}) are already associated", msnId, cusipId);
            throw new ResponseStatusException(
                    BAD_REQUEST,
                    messageSource.getMessage(
                            "controller.entity_not_associated", new Object[] {"MSN", msnId, "CUSIP", cusipId}, Locale.US));
        }

        Cusip cusipToUpdate = cusip.get();
        cusipToUpdate.getMsns().add(msn.get());
        cusipRepository.saveAndFlush(cusipToUpdate);
        return new ResponseEntity<>(cusipToUpdate, OK);
    }

}

@And({
        @Spec(path = "clazz", params = "class", spec = Like.class),
        @Spec(path = "type", spec = Like.class),
        @Spec(path = "ticker", spec = Like.class)
})
interface CusipSpec extends Specification<Cusip> {}