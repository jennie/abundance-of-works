<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="heading">
        <div class="subhead">
          All works by producer
        </div>
        <h1>
          {{ $page.producer.name }}
        </h1>
      </div>

      <div class="divide-y divide-darkLinen">
        <ul v-for="work in $page.producer.works" :key="work.id">
          <li class="text-xl py-4">
            <g-link :to="work.path" class="underline">
              {{ work.title }}
            </g-link>
            <span v-if="work.year.length" class="ml-2"
              >({{ work.year[0].name }})</span
            >
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  producer(id: $id) {
    name
    works {
      title
      path
      year {
        name
      }      
    }
  }
}
</page-query>
