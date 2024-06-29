import { sanityClient } from "sanity:client";
import { transformCourse } from './transformCourse.js';

async function getCollections() {
  try {
    const collections = await sanityClient.fetch(`*[_type == "collection" && count(courses[]) > 0 && !(_id in path("drafts.**"))]{
      ...,
      "courses": courses[]->{
        ...,
        "teacher": coalesce(teacher[]->{
          ...
        }, []),
        "provider": coalesce(provider[]->{
          ...
        }, [])
      }
    }`);

    // Apply transformCourse to each course in each collection
    const transformedCollections = collections.map(collection => ({
      ...collection,
      courses: collection.courses.map(course => transformCourse(course))
    }));

    return transformedCollections; // Collections now include all fields for the collection, courses, teachers, and providers, with teacher and provider defaulting to [] if not present
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw new Error(`Failed to fetch collections: ${error.message}`);
  }
}
export default getCollections;