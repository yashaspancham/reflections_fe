export interface entryT {
  datetime: Date;
  entryTitle: string;
  entryContent: string;
}

export interface oldEntryT extends entryT {
  entry_id: number;
}

export interface apiReturnErrorT {
  status: number;
  message: string;
  success: boolean;
}