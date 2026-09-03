// Swatantra Bharat Scheme - Concessional Scheme Catalogue
// Problem Statement: AI-Driven Scheme Matching for Marginalized Entrepreneurs (SIH 2026)
// Targets SC beneficiaries with annual family income up to ₹5 lakh.
// Concessional assistance covers up to 90% of project/education cost.

export const SCHEMES = [
  {
    id: "micro-finance",
    name: "Micro Finance Scheme",
    shortName: "Micro Finance",
    category: "Micro & Small Business",
    purpose: "micro_business", // matches questionnaire
    tagline: "Quick concessional credit for micro-enterprises and small trade",
    maxLoanAmount: 140000, // ₹1.40 Lakh
    displayMaxLoan: "₹1.40 Lakh",
    minLoanAmount: 15000,
    interestRate: 5.0, // 5% p.a. concessional
    moratoriumMonths: 6,
    maxTenureYears: 3,
    coveragePercentage: 90, // Up to 90% of project cost
    promoterContribution: 10, // 10% by beneficiary/SCA
    incomeEligibilityMax: 500000, // ₹5 Lakh annual family income
    displayIncomeLimit: "Up to ₹5 Lakh / year",
    targetBeneficiaries: [
      "Aspiring entrepreneur",
      "Self-employed",
      "Micro/small business",
      "Existing entrepreneur",
    ],
    supportedPartnerTypes: ["SCA", "NBFC-MFI", "RRB", "PSB"],
    description:
      "Concessional micro-credit assistance designed to empower marginalized individuals to start small retail shops, handicraft units, service businesses, or micro-enterprises without heavy collateral burdens.",
    keyBenefits: [
      "Covers up to 90% of total project cost",
      "Low concessional interest rate of 5% p.a.",
      "6-month repayment moratorium to establish cash flow",
      "Flexible repayment window of up to 3 years",
    ],
    eligibilityCriteria: [
      "Belonging to Scheduled Caste (SC) community",
      "Annual family income must not exceed ₹5,00,000",
      "Age between 18 and 60 years",
      "Viable micro-business or self-employment proposal",
    ],
    documentsRequired: [
      "Aadhaar Card / Voter ID (Identity Proof)",
      "Caste / Community Certificate issued by competent authority",
      "Income Certificate (Tehsildar / Competent Authority)",
      "Bank Account Details (Passbook copy / Cancelled cheque)",
      "Basic Project Outline / Quotation of machinery or stock",
      "Passport size photographs (2 copies)",
    ],
    guidelinesUrl: "#guidelines",
    isDemoData: true,
  },
  {
    id: "term-loan",
    name: "Term Loan Scheme",
    shortName: "Term Loan",
    category: "Business Expansion & Medium Enterprise",
    purpose: "expand_business", // also fits new large business
    tagline: "Substantial capital funding for scalable business ventures and industry",
    maxLoanAmount: 5000000, // ₹50 Lakh
    displayMaxLoan: "₹50.00 Lakh",
    minLoanAmount: 140001,
    interestRate: 6.0, // 6% p.a. concessional
    moratoriumMonths: 12,
    maxTenureYears: 5,
    coveragePercentage: 90, // Up to 90% of project cost
    promoterContribution: 10,
    incomeEligibilityMax: 500000,
    displayIncomeLimit: "Up to ₹5 Lakh / year",
    targetBeneficiaries: [
      "Existing entrepreneur",
      "Aspiring entrepreneur",
      "Start a new business",
    ],
    supportedPartnerTypes: ["SCA", "PSB", "RRB"],
    description:
      "Medium to long-term concessional credit aimed at financing plant, machinery, working capital, transport, or service enterprise creation and substantial expansion for marginalized entrepreneurs.",
    keyBenefits: [
      "Loan sanctions up to ₹50 Lakh with 90% concessional coverage",
      "Low 6% p.a. interest rate for productive capital assets",
      "Up to 12 months moratorium during establishment/expansion phase",
      "Repayable in convenient quarterly or monthly installments over 5 years",
    ],
    eligibilityCriteria: [
      "Scheduled Caste (SC) beneficiary with valid community certificate",
      "Family annual income under ₹5,00,000",
      "Valid business registration, Udhyam certificate, or detailed DPR",
      "Experience or technical qualification in the proposed trade",
    ],
    documentsRequired: [
      "Aadhaar Card & PAN Card",
      "SC Community Certificate",
      "Family Income Certificate (under ₹5 Lakh)",
      "Detailed Project Report (DPR) with cash flow projections",
      "Quotations for machinery/equipment/civil works",
      "Udyam MSME Registration (if existing)",
      "Bank statements for the past 6 months",
    ],
    guidelinesUrl: "#guidelines",
    isDemoData: true,
  },
  {
    id: "educational-loan",
    name: "Educational Loan Scheme",
    shortName: "Educational Loan",
    category: "Higher & Professional Education",
    purpose: "education",
    tagline: "Concessional credit for professional courses in India and abroad",
    maxLoanAmount: 2000000, // ₹20 Lakh (Domestic ₹10L, Abroad ₹20L)
    displayMaxLoan: "Up to ₹20.00 Lakh",
    minLoanAmount: 50000,
    interestRate: 4.0, // 4% p.a. (3.5% for female students)
    moratoriumMonths: 48, // Course duration + 1 year
    maxTenureYears: 10,
    coveragePercentage: 90, // Up to 90% of total education cost
    promoterContribution: 10,
    incomeEligibilityMax: 500000,
    displayIncomeLimit: "Up to ₹5 Lakh / year",
    targetBeneficiaries: ["Student", "Skill development"],
    supportedPartnerTypes: ["PSB", "SCA", "RRB"],
    description:
      "Financial assistance at deeply concessional interest rates for eligible students pursuing professional degrees, engineering, medicine, management, or technical higher education in India and recognized overseas universities.",
    keyBenefits: [
      "Covers admission fees, tuition, books, equipment, and hostel expenses",
      "Concessional 4% interest rate (3.5% for women students)",
      "Moratorium covers the entire course duration plus 1 year post-completion",
      "Up to 10-year repayment tenure after moratorium",
    ],
    eligibilityCriteria: [
      "SC student admitted to an approved professional or technical course",
      "Family annual income up to ₹5,00,000",
      "Secured admission through merit or entrance exam in recognized institute",
    ],
    documentsRequired: [
      "Student & Parent Aadhaar Card",
      "Caste Certificate & Valid Income Certificate",
      "Admission confirmation letter / Fee schedule from university",
      "10th, 12th, and Degree marksheets",
      "Entrance exam scorecard / Bonafide certificate",
      "Parent/Guardian guarantor documents & bank passbook",
    ],
    guidelinesUrl: "#guidelines",
    isDemoData: true,
  },
  {
    id: "mahila-samriddhi",
    name: "Mahila Samriddhi Yojana",
    shortName: "Mahila Samriddhi",
    category: "Women Entrepreneurship",
    purpose: "micro_business",
    tagline: "Targeted concessional micro-financing for SC women entrepreneurs & SHGs",
    maxLoanAmount: 140000,
    displayMaxLoan: "₹1.40 Lakh",
    minLoanAmount: 10000,
    interestRate: 4.0, // Special 4% rate for women
    moratoriumMonths: 6,
    maxTenureYears: 3,
    coveragePercentage: 90,
    promoterContribution: 10,
    incomeEligibilityMax: 500000,
    displayIncomeLimit: "Up to ₹5 Lakh / year",
    targetBeneficiaries: ["Aspiring entrepreneur", "Self-employed", "Worker"],
    supportedPartnerTypes: ["SCA", "NBFC-MFI", "RRB"],
    description:
      "Exclusive concessional credit programme providing micro-credit directly or through Self-Help Groups (SHGs) to women beneficiaries for tailoring, food processing, dairy farming, and small artisan ventures.",
    keyBenefits: [
      "Lowest interest rate of 4% p.a. for women beneficiaries",
      "Simplified documentation through local SHG / SCA clusters",
      "Up to 90% project financing",
      "Repayment holiday of 6 months",
    ],
    eligibilityCriteria: [
      "SC Woman applicant aged 18 to 60",
      "Annual family income under ₹5,00,000",
      "Individual or member of registered Women Self-Help Group",
    ],
    documentsRequired: [
      "Aadhaar Card",
      "SC Certificate & Family Income Certificate",
      "SHG Membership Letter / Business activity plan",
      "Bank savings account passbook",
    ],
    guidelinesUrl: "#guidelines",
    isDemoData: true,
  },
  {
    id: "skill-development-loan",
    name: "Skill Development & Tooling Loan",
    shortName: "Skill Loan",
    category: "Vocational Skills & Modern Tooling",
    purpose: "skill_development",
    tagline: "Funding for certified technical vocational training and toolkits",
    maxLoanAmount: 400000,
    displayMaxLoan: "₹4.00 Lakh",
    minLoanAmount: 20000,
    interestRate: 4.5,
    moratoriumMonths: 12,
    maxTenureYears: 4,
    coveragePercentage: 90,
    promoterContribution: 10,
    incomeEligibilityMax: 500000,
    displayIncomeLimit: "Up to ₹5 Lakh / year",
    targetBeneficiaries: ["Student", "Aspiring entrepreneur", "Worker"],
    supportedPartnerTypes: ["PSB", "RRB", "SCA"],
    description:
      "Financial assistance for job-oriented vocational training, technical certifications, and acquisition of modern work toolkits or software to enhance earning capacity.",
    keyBenefits: [
      "Up to ₹4 Lakh for NSQF-aligned training courses and modern tools",
      "Concessional 4.5% interest rate",
      "12-month course and placement moratorium",
    ],
    eligibilityCriteria: [
      "SC candidate enrolled in NSQF / government accredited vocational institute",
      "Family annual income up to ₹5,00,000",
      "Age 18 to 45 years",
    ],
    documentsRequired: [
      "Aadhaar Card & Caste Certificate",
      "Income Certificate (under ₹5 Lakh)",
      "Course admission certificate / Toolkit quotation",
      "Bank Account details",
    ],
    guidelinesUrl: "#guidelines",
    isDemoData: true,
  },
  {
    id: "sanitation-workers-credit",
    name: "Sanitation & Allied Workers Rehabilitation Credit",
    shortName: "Allied Workers Credit",
    category: "Alternative Livelihoods",
    purpose: "start_business",
    tagline: "Comprehensive concessional assistance for dignified self-employment ventures",
    maxLoanAmount: 500000,
    displayMaxLoan: "₹5.00 Lakh",
    minLoanAmount: 25000,
    interestRate: 4.0,
    moratoriumMonths: 9,
    maxTenureYears: 5,
    coveragePercentage: 90,
    promoterContribution: 10,
    incomeEligibilityMax: 500000,
    displayIncomeLimit: "Up to ₹5 Lakh / year",
    targetBeneficiaries: ["Aspiring entrepreneur", "Worker", "Self-employed"],
    supportedPartnerTypes: ["SCA", "PSB", "RRB"],
    description:
      "Specialized concessional financing programme to support sanitation workers and dependents in transitioning to dignified businesses like transport services, sanitation machinery operation, retail, or dairy.",
    keyBenefits: [
      "Up to ₹5 Lakh project assistance with capital subsidy linkages",
      "Concessional 4% interest rate",
      "9-month moratorium for initial business stabilization",
    ],
    eligibilityCriteria: [
      "Target beneficiary or dependent certified under National Rehabilitation guidelines",
      "Family income within eligibility norms (up to ₹5,00,000)",
      "Viable commercial livelihood plan",
    ],
    documentsRequired: [
      "Aadhaar Card & Identity verification",
      "Target Beneficiary Certificate / ID Card",
      "Family Income Certificate",
      "Project summary & quotation for assets",
    ],
    guidelinesUrl: "#guidelines",
    isDemoData: true,
  },
];

export const CATEGORIES = [
  "All",
  "Micro & Small Business",
  "Business Expansion & Medium Enterprise",
  "Higher & Professional Education",
  "Women Entrepreneurship",
  "Vocational Skills & Modern Tooling",
  "Alternative Livelihoods",
];
