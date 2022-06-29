import { Reference } from './auth/users.model';
import { Period } from './periods.model';

export interface Skill {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface StudentSkill {
  id: string;
  student: Reference;
  skill: Skill;
  year: number;
  periods: SkillPeriod[];
}

interface SkillPeriod {
  period: Period;
  value: string;
}
