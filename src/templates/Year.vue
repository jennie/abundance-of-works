<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <h1 class="text-3xl font-bold leading-tight">
          {{ $page.year.name }}
        </h1>

        <div v-for="work in $page.year.works" :key="work.id">
          <g-link :to="work.path">
            {{ work.title }}
          </g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  year(id: $id) {
    name
    works {
      title
      path
    }
  }
}
</page-query>
