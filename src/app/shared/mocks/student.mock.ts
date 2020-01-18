import { Student } from '../models/students.model';

export class StudentsMock {
  public static sample: Student = {
    id: 'string',
    code: 'string',
    schoolId: 'string',
    firstName: 'string',
    middleName: 'string',
    surname: 'string',
    secondSurname: 'string',
    address: 'string',
    birthCountry: 'string',
    province: 'string',
    enrollDate: new Date(),
    originSchool: 'string',
    transferReason: 'string',
    guardians: [
      {
        name: 'string',
        relation: 'string',
        nationality: 'string',
        documentId: 'string',
        phoneNumber: 'string',
        mobileNumber: 'string',
        email: 'string',
        workAddress: 'string',
        address: 'string'
      }
    ],
    mother: {
      name: 'string',
      relation: 'string',
      nationality: 'string',
      documentId: 'string',
      phoneNumber: 'string',
      mobileNumber: 'string',
      email: 'string',
      workAddress: 'string',
      address: 'string'
    },
    father: {
      name: 'string',
      relation: 'string',
      nationality: 'string',
      documentId: 'string',
      phoneNumber: 'string',
      mobileNumber: 'string',
      email: 'string',
      workAddress: 'string',
      address: 'string'
    },
    fullName: 'string',
    name: 'string',
    age: 0,
    shortName: 'string',
    group: {
      id: 'string',
      schoolId: 'string',
      level: {
        id: 0,
        name: 'string',
        ordinal: 'string'
      },
      name: 'string',
      counselor: {
        id: 'string',
        name: 'string'
      },
      studyPlan: {
        id: 'string',
        name: 'string'
      },
      createDate: new Date(),
      modificateDate: new Date()
    },
    birthDate: new Date(),
    gender: {
      id: 0,
      name: 'string'
    },
    documentId: 'string',
    avatarURL: 'string',
    active: true,
    medicalInfo: {
      bloodGroup: 'string',
      allergies: 'string',
      medicine: 'string',
      pediatrician: 'string',
      hospital: 'string'
    },
    createDate: new Date(),
    modificateDate: new Date()
  };
}
