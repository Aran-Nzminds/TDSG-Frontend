interface IUserDetailsProps {
  displayName: string;
  userPrincipalName: string;
  mail: string | null;
  mobilePhone: string | null;
  businessPhones: string[];
  jobTitle: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
}

export { IUserDetailsProps };
