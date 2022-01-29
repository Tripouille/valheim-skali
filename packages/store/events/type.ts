export interface Event {
  // _id: string;
  name: string;
  href?: string;
  tags: string[];
  startDate: string;
  endDate?: string;
  continuous: boolean;
  location?: string;
  RPDescription?: string;
  description: string;
}
