<script>
    export let item;
</script>

<a
    href={item.id}
    class="block mb-2 text-inherit no-underline transition-transform duration-200 ease-in-out hover:-translate-y-1"
    rel="noopener"
    aria-label={`Read more about ${item.name}`}
>
    <div class="bg-white rounded-lg p-6 shadow-md h-full">
        <h3 class="mt-0 mb-3 text-xl font-medium">{item.name}</h3>
    </div>
</a>
