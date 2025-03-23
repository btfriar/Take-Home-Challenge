// @ts-nocheck
import type { PageServerLoad } from "./$types";

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  // Get the id from the URL
  const { id } = params;
  try {
    // Fetch the Pokémon data for the specified ID
    const response = await fetch(
      `https://meowing-bristle-alamosaurus.glitch.me/api/pokemon/${id}`,
    );

    if (!response.ok) {
      throw new Error(`Failed with response: ${response.status}`);
    }

    const item = await response.json();
    console.log(item);
    return {
      id,
      item,
    };
  } catch (error) {
    console.error(`Error Message: ${error}`);

    return {
      id,
      item: null,
      error: `${error}`,
    };
  }
};
