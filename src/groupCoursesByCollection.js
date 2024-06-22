import getCourses from "./getCourses";

async function groupCoursesByCollection() {
  const courses = await getCourses();
  const collectionsMap = {};
console.log(courses);
  // Check if courses is not null or undefined before calling forEach
  if (courses) {
    courses.forEach(course => {
      // Also check if course.collections is not null or undefined
      if (course.collection) {
        course.collection.forEach(collection => {
          if (!collectionsMap[collection._id]) {
            collectionsMap[collection._id] = {
              title: collection.title,
              description: collection.description,
              courses: []
            };
          }
          collectionsMap[collection._id].courses.push(course);
        });
      }
    });
  }

  return Object.values(collectionsMap); // Convert the map to an array of collections
}

export default groupCoursesByCollection;