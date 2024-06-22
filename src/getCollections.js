import { sanityClient } from "sanity:client";

// Define an asynchronous function to get collections
async function getCollections() {
  try {
    const collections = await sanityClient.fetch(`*[_type == "collection" && !(_id in path("drafts.**"))]{
      title,
      description
    }`);

    return collections; // Collections already have the desired structure
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw new Error(`Failed to fetch collections: ${error.message}`);
  }
}
export default getCollections;