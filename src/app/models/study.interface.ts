export interface DICOMStudy {
  id: string;
  patientName: string;
  patientId: string;
  birthDate?: string;
  gender?: 'M' | 'F' | 'O';
  accessionNumber: string;
  studyDate: string;
  studyTime?: string;
  studyDescription: string;
  referringPhysician?: string;
  facility?: string;
  modality: string;
  seriesCount: number;
  instancesCount: number;
  status?: string;
}

export interface DICOMSeries {
  id: string;
  seriesNumber: number;
  modality: string;
  description: string;
  instancesCount: number;
}
