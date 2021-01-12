const formatCurrency = (currency) => {
  return Number(currency).toLocaleString();
};

const formatPercentage = (percentage) => {
  return percentage.toFixed(2);
};

export const DATE_FORMAT = 'MM/DD/YYYY';

export const LOAN_STATUS_MAP = {
  'PERFORMING': 'Performing',
  '30_DAYS_LATE': '30 Days Late',
  '60_DAYS_LATE': '60 Days Late',
  '90_DAYS_LATE': '90 Days Late',
  'LOCKBOX_TRIGGERED': 'Lockbox Triggered',
  'DEFAULT': 'Default',
  'FORECLOSURE': 'Foreclosure',
  'PAID_OFF': 'Paid Off',
};

export const SECURITY_STATUS_MAP = {
  'PERFORMING': 'Performing',
  '30_DAYS_LATE': '30 Days Late',
  '60_DAYS_LATE': '60 Days Late',
  '90_DAYS_LATE': '90 Days Late',
  'LOCKBOX_TRIGGERED': 'Lockbox Triggered',
  'DEFAULT': 'Default',
  'FORECLOSURE': 'Foreclosure',
  'PAID_OFF': 'Paid Off',
};

export const PIPELINE_STATUS_MAP = {
  'NEW': 'New',
  'IN_PROGRESS': 'In Progress',
  'UNDERWRITING': 'Underwriting',
  'FUNDED': 'Funded',
  'CLOSED': 'Closed',
};

export const PROPERTY_TYPE_MAP = {
  'SINGLE_FAMILY': 'Single-Family',
  'MULTI_FAMILY': 'Multi-Family',
  'OFFICE': 'Office',
  'INDUSTRIAL': 'Industrial',
  'RETAIL': 'Retail',
  'HOTEL': 'Hotel',
  'SPECIAL_PURPOSE': 'Special-Purpose',
};

export const US_STATES_MAP = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'DC': 'District of Columbia',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
};

export { formatCurrency, formatPercentage };