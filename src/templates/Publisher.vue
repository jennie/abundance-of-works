<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <h1 class="text-3xl font-bold leading-tight">
          {{ $page.publisher.name }}
        </h1>

        <div v-for="work in $page.publisher.works" :key="work.id">
          <div class="text-2xl">
            <g-link :to="work.path">
              {{ work.title }}
            </g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  publisher(id: $id) {
    name
    works {
      title
      path
    }
  }
}
</page-query>
