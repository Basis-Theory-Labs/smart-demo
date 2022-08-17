export interface Driver {
  id?: string;
  name: string;
  phoneNumber: string;
  ssn?: string;
  ssnFingerprint?: string;
  tokenized?: boolean;
}
