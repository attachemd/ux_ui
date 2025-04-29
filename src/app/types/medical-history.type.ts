export interface MedicalHistoryBlock {
  title: string;
  class?: string;
  status?: string;
  surgeon?: string;
  note?: string;
  date?: string;
}

export interface MedicalHistoryEntity {
  title: string;
  blocks: MedicalHistoryBlock[];
}

export interface Note {
  id: number;
  author: string;
  text: string;
  quoteId?: number;
  date?: string;
}

export interface MedicalConditionStatus {
  name: string;
}
