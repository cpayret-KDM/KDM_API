const formatCurrency = (currency) => {
  return Number(currency).toLocaleString();
};

const formatPercentage = (percentage) => {
  return percentage.toFixed(2);
};

export const DATE_FORMAT = 'MM/DD/YYYY';

export const LOAN_STATUS_MAP = {
  'PERFORMING': 'Performing',
  'LATE_30_DAYS': '30 Days Late',
  'LATE_60_DAYS': '60 Days Late',
  'LATE_90_DAYS': '90 Days Late',
  'LOCKBOX_TRIGGERED': 'Lockbox Triggered',
  'DEFAULT': 'Default',
  'FORECLOSURE': 'Foreclosure',
  'PAID_OFF': 'Paid Off',
};

export const SECURITY_STATUS_MAP = {
  'PERFORMING': 'Performing',
  'LATE_30_DAYS': '30 Days Late',
  'LATE_60_DAYS': '60 Days Late',
  'LATE_90_DAYS': '90 Days Late',
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
  'SINGLE_FAMILY' : 'Single-Family',
  'MULTI_FAMILY' : 'Multi-Family',
  'OFFICE' : 'Office',
  'COMMERCIAL' : 'Commercial',
  'INDUSTRIAL' : 'Industrial',
  'RETAIL' : 'Retail',
  'HOTEL' : 'Hotel',
  'SPECIAL_PURPOSE' : 'Special-Purpose',
  'OTHER' : 'Other'
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

export const EMPTY_LOAN = {
  KDMRating: '',
  dealName: '',
  id: '',
  initialAmount: '',
  loanNumber: '',
  loanRate: '',
  loanStatus: '',
  loanTermMonths: '',
  ltv: '',
  maturityDate: '',
  memoUrl: '',
  msn: '',
  msnId: '',
  originationDate: '',
  pipelineStatus: '',
  prepayMonths: '',
  principalBalance: '',
  properties: [],
  ratings: [],
  sponsor: '',
  sponsorID: '',
  spread: '',
  tradeDate: '',
};

export { formatCurrency, formatPercentage };