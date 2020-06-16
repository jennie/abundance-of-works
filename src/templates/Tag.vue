<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <h1 class="text-3xl font-bold leading-tight">
          {{ $page.tag.name }}
        </h1>
        <div class="divide-y divide-gray-400">
          <div v-for="work in $page.tag.works" :key="work.id" class="">
            <div class="text-xl py-4">
              <g-link :to="work.path">
                {{ work.title }}
              </g-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  tag(id: $id) {
    name
    works {
      title
      path
    }
  }
}
</page-query>
