import { Reference } from './users.model';

export interface EvaluationArea {
  id: string;
  plan: Reference;
  name: string;
  description: string;
  color: string;
  icon: string;
  items: EvaluationItem[];
}

export interface EvaluationItem {
  name: string;
  description: string;
}
