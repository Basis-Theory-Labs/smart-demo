interface Driver {
  id?: string;
  name: string;
  phoneNumber: string;
  ssn?: string;
  ssnFingerprint?: string;
  tokenized?: boolean;
  tenant: string;
}

export type { Driver };
