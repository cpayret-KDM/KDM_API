package com.kdm.web.model;

public enum PropertyType {
	
	MULTI_FAMILY("Multi-Family"),
	SINGLE_FAMILY("Single-Family"),
	OFFICE("Office"),
	INDUSTRIAL("Industrial"),
	RETAIL("Retail"),
	HOTEL("Hotel"),
	SPECIAL_PURPOSE("Special-Pupose"),
	COMMERCIAL("Commercial"),
	OTHER("Other");

	private final String label;
	
	PropertyType(String label) {
		this.label = label;
	}
	
	//@JsonValue
	public String getLabel() {
		return this.label;
	}
	
	public static PropertyType fromString(String text) {
        for (PropertyType pt : PropertyType.values()) {
            if (pt.label.equalsIgnoreCase(text)) {
                return pt;
            }
        }
        return null;
    }

}
