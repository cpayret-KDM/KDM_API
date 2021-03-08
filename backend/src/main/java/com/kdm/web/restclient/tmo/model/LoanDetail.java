package com.kdm.web.restclient.tmo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * DTO object that is returned by the TMO api GET https://absws.com/TmoAPI/v1/LSS.svc/GetLoan/{{AccountNumber}}
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@Getter @Setter @NoArgsConstructor
public class LoanDetail {
	
	//"Account": "2017-L001",
	@JsonProperty("Account")
	private String account;
	
	@JsonProperty("PrimaryBorrower")
	private Borrower primaryBorrower;
	
	@JsonProperty("Terms")
	private LoanTerms terms;
	
	@JsonProperty("SortName")
	private String sortName;
	
	@JsonProperty("EmailAddress")
	private String email;
	
	@JsonProperty("IndividualName")
	private String individualName;
	
	// interesting fields we may need
	//  "DebitAmount": "5106.37",
	//  "DebitDueDay": "1",
}
