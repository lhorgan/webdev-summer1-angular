export class WidgetServiceClient {
  findWidgetsForLesson(lessonId) {
    console.log("service: finding widgets for lesson " + lessonId);
    return fetch('http://localhost:8080/api/lesson/' + lessonId + '/widget')
      .then(response => {
        //console.log(response.json());
        return response.json()
      });
  }
}
