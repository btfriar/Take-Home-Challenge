<script>
    export let item;
</script>

<a
    href={item.id}
    class="card-link mb-2"
    rel="noopener"
    aria-label={`Read more about ${item.name}`}
>
    <div class="card">
        <h3 class="card-title">{item.name}</h3>
    </div>
</a>

<style>
    .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        transition: transform 0.2s ease-in-out;
    }

    .card-link:hover {
        transform: translateY(-3px);
    }

    .card {
        background: #ffffff;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        height: 100%;
    }

    .card-title {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
    }
</style>
