<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import CardLink from "$lib/components/CardLink.svelte";

    let searchTerm = "";
    let isLoading = false;
    let errorMessage = "";
    let isFetchingNextPage = false;

    //api response interface
    interface PokemonApiResponse {
        pokemon: Array<{
            id: string;
            name: string;
            [key: string]: any;
        }>;
        count: number;
        nextPage: string | null;
    }

    let displayItems: PokemonApiResponse = {
        pokemon: [],
        count: 0,
        nextPage: null,
    };

    //this var keep track of the api so only to show most current results
    let currentRequestId = 0;

    //debounce function to keep the pokemon search api from making too many requests
    function debounce<T extends (...args: any[]) => any>(
        func: T,
        timeout = 300,
    ): (...args: Parameters<T>) => void {
        let timer: ReturnType<typeof setTimeout> | undefined;
        return (...args: Parameters<T>) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    // Function to fetch pokemon data at api/pokemon/search/{search-word} where pokemon name starts with search-word
    async function fetchSearchResults(
        search: string,
        pageToken: string | null = null,
        appendResults = false,
    ) {
        if (!search || search.trim() === "") {
            displayItems = {
                pokemon: [],
                count: 0,
                nextPage: null,
            };
            return;
        }

        if (!pageToken) {
            errorMessage = "";
            isLoading = !appendResults;
            currentRequestId++;
        } else {
            isFetchingNextPage = true;
        }
        const requestId = currentRequestId;

        try {
            let url = `https://meowing-bristle-alamosaurus.glitch.me/api/pokemon/search/${search}`;
            if (pageToken) {
                url += `?page=${pageToken}`;
            }

            const response = await fetch(url);

            //if the search field is empty, return
            if (!searchTerm.trim()) {
                displayItems = {
                    pokemon: [],
                    count: 0,
                    nextPage: null,
                };
                return;
            }

            if (requestId !== currentRequestId && !appendResults) {
                return;
            }

            if (response.ok) {
                const data = await response.json();

                // Save next page token if it exists
                const currentNextPageToken = data.nextPage || null;
                //append new results to existing results
                if (appendResults && displayItems.pokemon) {
                    displayItems = {
                        ...data,
                        pokemon: [...displayItems.pokemon, ...data.pokemon],
                    };
                } else {
                    displayItems = data;
                }

                setTimeout(() => {
                    displayItems.nextPage = currentNextPageToken;
                    if (currentNextPageToken && !isFetchingNextPage) {
                        fetchSearchResults(search, currentNextPageToken, true);
                    }
                }, 300);
            } else {
                let errorDetail;
                try {
                    errorDetail = await response.json();
                } catch (e) {
                    errorDetail = await response.text();
                }

                console.error(
                    "Search failed:",
                    response.statusText,
                    errorDetail,
                );

                if (!appendResults) {
                    displayItems = {
                        pokemon: [],
                        count: 0,
                        nextPage: null,
                    };
                }

                // Show the errors to user that were returned in the api res
                if (
                    errorDetail &&
                    typeof errorDetail === "object" &&
                    "error" in errorDetail
                ) {
                    errorMessage = `Error: ${errorDetail.error}`;
                } else {
                    errorMessage = `Search failed: ${response.statusText || "Unknown error"}`;
                }
                displayItems.nextPage = null;
            }
        } catch (error) {
            // Only update state if this is still the most recent request
            if (requestId === currentRequestId || appendResults) {
                console.error("Error fetching search results:", error);

                if (!appendResults) {
                    displayItems = {
                        pokemon: [],
                        count: 0,
                        nextPage: null,
                    };
                }

                errorMessage =
                    error instanceof Error
                        ? `Error: ${error.message}`
                        : "An unexpected error occurred";

                displayItems.nextPage = null;
            }
        } finally {
            // Update loading states
            if (requestId === currentRequestId || appendResults) {
                isLoading = false;
                isFetchingNextPage = false;
            }
        }
    }

    // Create debounced version of search function
    const debouncedSearch = debounce((term) => fetchSearchResults(term), 300);

    // Watch for changes to search input
    $: {
        if (!searchTerm || searchTerm.trim() === "") {
            // Reset search list immediately when input is empty
            displayItems = {
                pokemon: [],
                count: 0,
                nextPage: null,
            };
            errorMessage = "";
        } else {
            debouncedSearch(searchTerm);
        }
    }

    const pageTitle = "Brandon Frair's Pokémon Search";
    const pageDescription =
        "Search for information about your favorite Pokémon";
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
</svelte:head>

<Header />

<main class="w-full my-6 p-4">
    <div
        class="w-full max-w-screen-md mx-auto flex justify-between items-center"
    >
        <label for="pokemon-search" class="sr-only">Search Pokémon</label>

        <input
            id="pokemon-search"
            class="w-full p-4 border rounded"
            type="text"
            placeholder="Search for Pokémon..."
            bind:value={searchTerm}
            aria-label="Search for Pokémon"
            aria-describedby="search-description"
        />
        <div id="search-description" class="sr-only">
            Type to search for Pokémon. Results will appear automatically.
        </div>
        {#if displayItems.pokemon && displayItems.pokemon.length > 0}
            <div class="sr-only" role="status" aria-live="polite">
                Found {displayItems.count} Pokémon matching your search
            </div>
        {/if}
    </div>

    {#if errorMessage}
        <div
            class="w-full max-w-screen-md mx-auto text-center py-4 text-red-500"
            role="alert"
            aria-live="assertive"
        >
            {errorMessage}
        </div>
    {/if}

    {#if isLoading && !isFetchingNextPage}
        <div
            class="w-full max-w-screen-md mx-auto text-center py-4"
            role="status"
            aria-live="polite"
        >
            Loading...
        </div>
    {:else}
        <div
            class="w-full max-w-screen-md mx-auto flex flex-col pt-6 cards-container"
            role="region"
            aria-labelledby="search-results-heading"
        >
            <h2 id="search-results-heading" class="sr-only">Search Results</h2>

            {#if searchTerm.trim() !== "" && (!displayItems.pokemon || displayItems.pokemon.length === 0)}
                <div class="text-center py-4" role="status">
                    No Pokémon found
                </div>
            {:else}
                {#each displayItems.pokemon as item, index (item.id + "-" + index)}
                    <CardLink {item} />
                {/each}

                {#if isFetchingNextPage}
                    <div
                        class="text-center py-4"
                        role="status"
                        aria-live="polite"
                    >
                        <div class="inline-block px-4 py-2 text-gray-500">
                            Loading more Pokémon...
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
</main>
