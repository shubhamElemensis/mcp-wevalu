export interface TreeNode {
  _id: string;
  avatar: string;
  currentDepartment: string;
  currentJob: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  relationshipType: string | null;
  children: TreeNode[];
}

export interface Certificate {
  _id: string;
  certificateName: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string | null;
  certificateUrl: string;
}

export interface Experience {
  _id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
}

export interface Education {
  _id: string;
  educationName: string;
  educationalSchooling: string;
  typeOfTraining: string;
  trainingCenter: string;
  startDate: string;
  endDate: string | null;
}

export interface JobHistory {
  job: string;
  endDate: string;
}

export interface DepartmentHistory {
  department: string;
  endDate: string;
}

export interface BusinessUnitHistory {
  businessUnit: string;
  endDate: string;
}

export interface BusinessAreaHistory {
  businessArea: string;
  endDate: string;
}

export interface Relation {
  user: string;
  startDate: string;
  endDate: string | null;
}

export interface EvaluationRef {
  _id: string;
}

export interface JobDetail {
  _id: string;
  name: string;
  description: string;
  hostCompany: string;
  personalityWeight: number;
  interactionWeight: number;
  skillWeight: number;
  implementationWeight: number;
  actWithCredibility: number;
  beingResilient: number;
  actReliable: number;
  takingResponsibility: number;
  showEngagement: number;
  beingOpen: number;
  leadAuthentically: number;
  communicateSkillfully: number;
  teamContribution: number;
  solveConflicts: number;
  presentConvincingly: number;
  debateConfidently: number;
  enforceSuccessfully: number;
  leadAppreciatively: number;
  organizeIndependently: number;
  planningWithSenseOfConfidence: number;
  solvingProblems: number;
  proceedAnalytically: number;
  actEntrepreneurially: number;
  designNew: number;
  goalOrientedLeader: number;
  followThroughWithProjects: number;
  implementEfficiently: number;
  solutionOrientedConsulting: number;
  makingDecisions: number;
  actGoalOriented: number;
  proceedStrategically: number;
  leadResponsibly: number;
  completed: boolean;
  isDeleted: boolean;
  creationDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  personalityAverage: string;
  tenantId: string;
}

export interface Department {
  _id: string;
  name: string;
  head: string;
  size: number;
  businessUnitLock: boolean;
  businessAreaLock: boolean;
  company: string | null;
  companyLock: boolean;
  hostCompany: string;
  completed: boolean;
  mbos: any[];
  isDeleted: boolean;
  creationDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  tenantId: string;
}

export interface BusinessUnit {
  _id: string;
  name: string;
  head: string;
  size: number;
  businessArea: string | null;
  businessAreaLock: boolean;
  tenantId: string;
  companyLock: boolean;
  departments: { department: string; _id: string }[];
  startDate: string | null;
  endDate: string | null;
  comment: string;
  hostCompany: string;
  completed: boolean;
  mbos: { mbo: string; _id: string }[];
  isDeleted: boolean;
  creationDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Profile {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  birthday: string;
  gender: string;
  email: string;
  employeeId: string;
  currentJob: JobDetail;
  languages: string[];
  skills: string[];
  canRedoBigFive: boolean;
  previousJobs: JobHistory[];
  previousDepartments: DepartmentHistory[];
  previousBusinessUnits: BusinessUnitHistory[];
  previousBusinessAreas: BusinessAreaHistory[];
  previousCompanies: any[];
  supervisor: Relation[];
  subordinate: Relation[];
  experience: Experience[];
  education: Education[];
  developmentPrograms: any[];
  projects: any[];
  certificates: Certificate[];
  evaluations: EvaluationRef[];
  tsEvaluations: EvaluationRef[];
  currentScrumTeams: any[];
  previousScrumTeams: any[];
  mbos: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  currentDepartment: Department;
  additionAddress: string;
  address: string;
  areaCode: string;
  city: string;
  country: string;
  houseNr: string;
  state: string;
  subarea: string;
  telephoneNumber: string;
  remark: string;
  certificate: Certificate[];
  facebook: string;
  google: string;
  instagram: string;
  linkedIn: string;
  twitter: string;
  whatsApp: string;
  currentBusinessArea: string;
  currentBusinessUnit: BusinessUnit;
  managementLevel: string;
  bigFive: string;
}

export interface ListViewUser {
  _id: string;
  role: string;
  email: string;
  mobileNumber: string;
  avatar: string;
  twoFactorAuthenticationEnabled: boolean;
  hostCompany: string;
  verified: boolean;
  creationDate: string;
  profile: Profile;
  lastLogin: string;
  departmentId: string;
  firstName: string;
  lastName: string;
  job: string;
  department: string;
  businessUnit: string;
}

export interface TsEvaluationResponse {
  data: {
    treeView: TreeNode;
    listView: ListViewUser[];
  };
  message: string;
  success: boolean;
}
