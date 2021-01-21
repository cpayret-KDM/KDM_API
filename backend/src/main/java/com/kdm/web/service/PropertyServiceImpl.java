package com.kdm.web.service;

import java.util.Locale;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.kdm.web.data.repository.BorrowerRepository;
import com.kdm.web.data.repository.PropertyRepository;
import com.kdm.web.model.Address;
import com.kdm.web.model.Borrower;
import com.kdm.web.model.Property;

@Service
public class PropertyServiceImpl implements PropertyService {

	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private PropertyRepository propertyRepository;
	
	@Autowired
	private AddressService addressService;
	
	@Autowired
	private BorrowerRepository borrowerRepository;
	
	@Override
	@Transactional
	public Borrower createBorrower(Property property, Borrower borrower) {
		if (property == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("proeprty object is null"), Locale.US));
		}
		
		if ((borrower == null) || (borrower.getAddress() == null)){
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("borrower or address object is null"), Locale.US));
		}

		// lets figure if the address already exists
		Optional<Address> address = addressService.getOrPersistAddress(borrower.getAddressID(), borrower.getAddress());
		if (!address.isPresent()) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("address object is null"), Locale.US));
		}
		
		borrower.setAddressID(address.get().getId());
		Borrower savedBorrower = borrowerRepository.save(borrower); 
			
		property.setBorrower(savedBorrower);
		propertyRepository.saveAndFlush(property);
		
		return savedBorrower;
	}
	
	@Override
	@Transactional
	public Borrower updateBorrower(Borrower borrower) {
		if (borrower == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("borrower object is null"), Locale.US));
		}
	
		// lets figure if the address already exists
		Optional<Address> address = addressService.getOrPersistAddress(borrower.getAddressID(), borrower.getAddress());
		if (!address.isPresent()) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("address object is null"), Locale.US));
		}
		
		borrower.setAddressID(address.get().getId());
		Borrower savedBorrower = borrowerRepository.saveAndFlush(borrower);
		
		return savedBorrower;
	}
	
	@Override
	@Transactional
	public void deleteBorrower(Borrower borrower) {
		if (borrower == null || borrower.getId() == null) {
			throw new IllegalArgumentException(messageSource.getMessage("common.invalid_parameter", Arrays.array("borrower object is null"), Locale.US));
		}
		
		//check for a loan related to this sponsor
		Optional<Property> propertyOp = propertyRepository.findByBorrowerId(borrower.getId());
		
		if (propertyOp.isPresent()) {
			Property property = propertyOp.get();
			property.setBorrower(null);
			propertyRepository.save(property);
		}
		
		borrowerRepository.delete(borrower);	
	}
}
