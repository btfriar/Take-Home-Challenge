<script>
    import { page } from "$app/stores";
</script>

<div
    class="p-6 flex flex-col items-center justify-center min-h-[50vh] text-center"
>
    <h1 class="text-5xl font-bold mb-4">
        {$page.status}: {$page.error?.message || "Page not found"}
    </h1>

    <p class="mb-4">We couldn't find the page you were looking for.</p>
    <a class="text-blue-900 hover:underline" href="/">
        Go back to the homepage
    </a>
</div>
