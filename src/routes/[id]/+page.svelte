<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "$lib/components/Header.svelte";
    export let data: PageData;

    const { id, item, error } = data;

    const pageTitle = "Pokémon " + item.name;
    const pageDescription = "Search information about " + item.name;
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
</svelte:head>

<Header />

<main aria-labelledby="pokemon-title" class="w-full my-6">
    {#if error}
        <div
            class="text-red-600 text-center my-8"
            role="alert"
            aria-live="assertive"
        >
            <p>{error}</p>
            <a
                href="/"
                class="text-blue-600 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-700"
                >Go back to Pokémon list</a
            >
        </div>
    {:else if item}
        <div class="p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8 bg-gray-50">
            <h1 id="pokemon-title" class="font-bold text-4xl">
                {item.name} ({item.japanese_name})
            </h1>
            <p class="text-sm m-2">ID: {id}</p>
            <div class="flex flex-col gap-6 mt-4">
                <div
                    class="bg-white p-4 rounded-lg shadow-sm"
                    role="region"
                    aria-labelledby="types-heading"
                >
                    <h2 class="text-lg mb-2 pb-2 border-b border-gray-100">
                        Classification:
                    </h2>
                    <div class="flex flex-wrap gap-2">
                        {item.classfication}
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h2
                        id="types-heading"
                        class="text-lg mb-2 pb-2 border-b border-gray-100"
                    >
                        Types:
                    </h2>
                    <div class="flex flex-wrap gap-2">
                        <span
                            class="px-3 py-1 rounded-full text-sm {item.type1}"
                            >{item.type1}</span
                        >
                        {#if item.type2}
                            <span
                                class="px-3 py-1 rounded-full text-sm {item.type2}"
                                >{item.type2}</span
                            >
                        {/if}
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h2 class="text-lg mb-2 pb-2 border-b border-gray-100">
                        Abilities:
                    </h2>
                    <ul class="flex flex-wrap gap-2 mt-2 list-none p-0">
                        {#each item.abilities as ability, index (ability + "-" + index)}
                            <li class="px-3 py-1 rounded-full text-sm">
                                {ability}
                            </li>
                        {/each}
                    </ul>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h2 class="text-lg mb-2 pb-2 border-b border-gray-100">
                        Info:
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Height:</span
                            >
                            <span class="font-semibold">{item.height_m} m</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Weight:</span
                            >
                            <span class="font-semibold"
                                >{item.weight_kg} kg</span
                            >
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Gender Ratio:</span
                            >
                            <span class="font-semibold">
                                {Math.round(item.percentage_male)}%
                                <span class="sr-only">male</span>
                                /
                                {Math.round(100 - item.percentage_male)}%
                                <span class="sr-only">female</span>
                            </span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600">HP:</span>
                            <span class="font-semibold">{item.hp}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Attack:</span
                            >
                            <span class="font-semibold">{item.attack}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Defense:</span
                            >
                            <span class="font-semibold">{item.defense}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Sp. Attack:</span
                            >
                            <span class="font-semibold">{item.sp_attack}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Sp. Defense:</span
                            >
                            <span class="font-semibold">{item.sp_defense}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600">Speed:</span
                            >
                            <span class="font-semibold">{item.speed}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600">Total:</span
                            >
                            <span class="font-semibold">{item.base_total}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Generation:</span
                            >
                            <span class="font-semibold">{item.generation}</span>
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Legendary:</span
                            >
                            <span class="font-semibold"
                                >{item.is_legendary ? "Yes" : "No"}</span
                            >
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Happiness:</span
                            >
                            <span class="font-semibold"
                                >{item.base_happiness}</span
                            >
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Capture Rate:</span
                            >
                            <span class="font-semibold"
                                >{item.capture_rate}</span
                            >
                        </div>
                        <div class="flex justify-between items-center py-1">
                            <span class="font-medium text-gray-600"
                                >Egg Steps:</span
                            >
                            <span class="font-semibold"
                                >{item.base_egg_steps}</span
                            >
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h2 class="text-lg mb-2 pb-2 border-b border-gray-100">
                        Against Values:
                    </h2>
                    <div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Bugs:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_bug}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Dark:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_dark}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Dragon:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_dragon}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Electric:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_electric}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Fairy:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_fairy}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Flight:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_fight}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >fire:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_fire}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Flying:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_flying}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Ghost:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_ghost}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Grass:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_grass}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Ground:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_ground}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Ice:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_ice}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Normal:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_normal}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Poison:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_poison}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Psychic:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_psychic}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Rock:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_rock}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Steel:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_steel}</span
                                >
                            </div>
                            <div class="flex justify-between items-center py-1">
                                <span class="font-medium text-gray-600"
                                    >Water:</span
                                >
                                <span class="font-semibold"
                                    >{item.against_water}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="text-center my-8" aria-live="polite">
            <p>Loading Pokémon data...</p>
        </div>
    {/if}

    <div class="text-center mt-8">
        <a
            href="/"
            class="text-blue-700 no-underline px-4 py-2 bg-gray-100 rounded transition-colors hover:bg-gray-200 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-blue-700"
            >Back to Search</a
        >
    </div>
</main>

<style>
</style>
