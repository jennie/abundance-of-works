<template>
  <Layout>
    <div class="container-inner text-center mx-auto p-12 pt-0 md:w-2/3">
      <h2 class="text-3xl mb-4">Page Not Found</h2>
      <p class="text-red-600 font-bold text-xl my-4 leading-tight">
        Sorry! We couldn't find a page at "{{ $route.path }}".
      </p>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Page Not Found",
  },
};
</script>
