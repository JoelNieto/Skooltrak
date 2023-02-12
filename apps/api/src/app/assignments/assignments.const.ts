export const POPULATE = 'teacher course plan group documents type createdBy';
export const POPULATE_SUBJECT = {
  path: 'course',
  populate: {
    path: 'subject',
    model: 'Subject',
  },
};
