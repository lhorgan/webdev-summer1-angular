export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  findSectionsForStudent() {
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  updateSection(sectionId, name, seats) {
    console.log("UPDATING SECTION");
    const updatedSection = {name, seats};
    return fetch("http://localhost:4000/api/section/" + sectionId, {
      method: "put",
      body: JSON.stringify(updatedSection),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
